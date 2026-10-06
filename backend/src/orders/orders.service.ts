import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { randomBytes } from 'node:crypto';
import { pageArgs, paginated } from '../common/dto/pagination.dto';
import { toNumber } from '../common/utils';
import { Prisma } from '../generated/prisma/client';
import type { Order } from '../generated/prisma/client';
import { MailService } from '../mail/mail.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto, OrderQueryDto, UpdateOrderDto } from './dto/order.dto';
import { PaystackService, PaystackTransaction } from './paystack.service';

export const serializeOrder = (order: Order) => ({
  ...order,
  unitPrice: toNumber(order.unitPrice),
  amount: toNumber(order.amount),
});

/** Fields safe to show the buyer on the payment-result page. */
const publicOrder = (order: Order) => ({
  reference: order.reference,
  status: order.status,
  itemType: order.itemType,
  itemName: order.itemName,
  quantity: order.quantity,
  amount: toNumber(order.amount),
  currency: order.currency,
  paidAt: order.paidAt,
});

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly paystack: PaystackService,
    private readonly mail: MailService,
  ) {}

  /** Creates a PENDING order priced on the server, then initializes Paystack. */
  async checkout(dto: CreateOrderDto) {
    this.paystack.ensureConfigured(); // fail before creating an order
    const item =
      dto.itemType === 'BOOK'
        ? await this.prisma.book.findFirst({
            where: { id: dto.itemId, isPublished: true },
          })
        : await this.prisma.merchandise.findFirst({
            where: { id: dto.itemId, isPublished: true },
          });
    if (!item) throw new NotFoundException('Item not found');
    if (item.stock !== null && item.stock < dto.quantity) {
      throw new BadRequestException('Not enough stock');
    }
    const sizes = 'sizes' in item ? item.sizes : [];
    if (sizes.length && (!dto.size || !sizes.includes(dto.size))) {
      throw new BadRequestException(`Choose a size: ${sizes.join(', ')}`);
    }

    const amount = new Prisma.Decimal(item.price).mul(dto.quantity);
    const reference = `gsg_${dto.itemType.toLowerCase()}_${Date.now()}_${randomBytes(4).toString('hex')}`;

    const order = await this.prisma.order.create({
      data: {
        reference,
        itemType: dto.itemType,
        bookId: dto.itemType === 'BOOK' ? item.id : null,
        merchandiseId: dto.itemType === 'MERCHANDISE' ? item.id : null,
        itemName: item.title,
        size: sizes.length ? dto.size : null,
        quantity: dto.quantity,
        unitPrice: item.price,
        amount,
        currency: item.currency,
        buyerName: dto.buyerName,
        buyerEmail: dto.buyerEmail,
        buyerPhone: dto.buyerPhone ?? null,
      },
    });

    const init = await this.paystack.initialize({
      email: order.buyerEmail,
      amountMinor: amount.mul(100).toNumber(),
      currency: order.currency,
      reference,
      metadata: {
        orderId: order.id,
        custom_fields: [
          {
            display_name: 'Item',
            variable_name: 'item',
            value: order.itemName,
          },
          {
            display_name: 'Buyer',
            variable_name: 'buyer',
            value: order.buyerName,
          },
        ],
      },
    });

    return {
      reference,
      accessCode: init.access_code,
      authorizationUrl: init.authorization_url,
      publicKey: this.paystack.publicKey,
      amount: toNumber(amount),
      currency: order.currency,
      email: order.buyerEmail,
    };
  }

  /** Called by the website after the Paystack popup closes. */
  async verify(reference: string) {
    const order = await this.prisma.order.findUnique({ where: { reference } });
    if (!order) throw new NotFoundException('Order not found');
    if (order.status !== 'PENDING') return publicOrder(order);

    const txn = await this.paystack.verify(reference);
    return publicOrder(await this.applyTransaction(txn));
  }

  /** Webhook entry point (signature already checked by the controller). */
  async handleWebhook(event: { event?: string; data?: PaystackTransaction }) {
    if (event.event !== 'charge.success' || !event.data?.reference) return;
    // Re-fetch from Paystack rather than trusting the payload's numbers alone.
    const txn = await this.paystack.verify(event.data.reference);
    await this.applyTransaction(txn).catch((error: unknown) =>
      this.logger.warn(
        `Webhook for ${event.data?.reference}: ${String(error)}`,
      ),
    );
  }

  /**
   * Idempotently moves an order to PAID/FAILED based on a verified Paystack
   * transaction. Amount and currency must match what we charged.
   */
  private async applyTransaction(txn: PaystackTransaction): Promise<Order> {
    const order = await this.prisma.order.findUnique({
      where: { reference: txn.reference },
    });
    if (!order) throw new NotFoundException('Order not found');
    if (order.status !== 'PENDING') return order;

    if (txn.status === 'success') {
      const expectedMinor = new Prisma.Decimal(order.amount)
        .mul(100)
        .toNumber();
      if (txn.amount !== expectedMinor || txn.currency !== order.currency) {
        this.logger.error(
          `Amount mismatch on ${order.reference}: got ${txn.amount} ${txn.currency}, expected ${expectedMinor} ${order.currency}`,
        );
        return this.prisma.order.update({
          where: { id: order.id },
          data: {
            status: 'FAILED',
            providerTxnId: String(txn.id),
            notes: 'Amount/currency mismatch — review in Paystack dashboard',
          },
        });
      }

      const { paid, justPaid } = await this.prisma.$transaction(async (tx) => {
        // updateMany with a status guard makes concurrent webhook + verify safe.
        const { count } = await tx.order.updateMany({
          where: { id: order.id, status: 'PENDING' },
          data: {
            status: 'PAID',
            providerTxnId: String(txn.id),
            channel: txn.channel ?? null,
            paidAt: txn.paid_at ? new Date(txn.paid_at) : new Date(),
          },
        });
        if (count === 1) {
          const decrement = { stock: { decrement: order.quantity } };
          if (order.bookId) {
            await tx.book.updateMany({
              where: { id: order.bookId, stock: { not: null } },
              data: decrement,
            });
          } else if (order.merchandiseId) {
            await tx.merchandise.updateMany({
              where: { id: order.merchandiseId, stock: { not: null } },
              data: decrement,
            });
          }
        }
        return {
          paid: await tx.order.findUniqueOrThrow({ where: { id: order.id } }),
          justPaid: count === 1,
        };
      });
      // Only the request that flipped PENDING -> PAID sends the emails.
      if (justPaid) {
        void this.mail.orderPaid({
          ...paid,
          amount: toNumber(paid.amount) ?? 0,
        });
      }
      return paid;
    }

    if (['failed', 'abandoned', 'reversed'].includes(txn.status)) {
      return this.prisma.order.update({
        where: { id: order.id },
        data: {
          status: txn.status === 'abandoned' ? 'ABANDONED' : 'FAILED',
          providerTxnId: String(txn.id),
        },
      });
    }
    return order; // still ongoing / pending at Paystack
  }

  // ── Admin ────────────────────────────────────────────────────────────────

  async list(query: OrderQueryDto) {
    const where: Prisma.OrderWhereInput = {
      ...(query.status ? { status: query.status } : {}),
      ...(query.itemType ? { itemType: query.itemType } : {}),
      ...(query.search
        ? {
            OR: [
              { reference: { contains: query.search, mode: 'insensitive' } },
              { buyerEmail: { contains: query.search, mode: 'insensitive' } },
              { buyerName: { contains: query.search, mode: 'insensitive' } },
              { itemName: { contains: query.search, mode: 'insensitive' } },
            ],
          }
        : {}),
    };
    const [rows, total] = await this.prisma.$transaction([
      this.prisma.order.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        ...pageArgs(query),
      }),
      this.prisma.order.count({ where }),
    ]);
    return paginated(rows.map(serializeOrder), total, query);
  }

  async findOne(id: string) {
    return serializeOrder(
      await this.prisma.order.findUniqueOrThrow({ where: { id } }),
    );
  }

  async update(id: string, dto: UpdateOrderDto) {
    return serializeOrder(
      await this.prisma.order.update({ where: { id }, data: dto }),
    );
  }
}
