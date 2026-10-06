import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Module,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import type { RawBodyRequest } from '@nestjs/common';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import type { Request } from 'express';
import {
  Public,
  Roles,
  STAFF_ROLES,
} from '../common/decorators/auth.decorators';
import { CreateOrderDto, OrderQueryDto, UpdateOrderDto } from './dto/order.dto';
import { OrdersService } from './orders.service';
import { PaystackService } from './paystack.service';

@ApiTags('Public · Orders & payments')
@Public()
@Controller()
export class OrdersController {
  constructor(
    private readonly orders: OrdersService,
    private readonly paystack: PaystackService,
  ) {}

  /** Start a purchase. Returns the Paystack access code for the inline popup. */
  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  @Post('orders/checkout')
  checkout(@Body() dto: CreateOrderDto) {
    return this.orders.checkout(dto);
  }

  /** Confirm payment after the popup/redirect returns. */
  @Throttle({ default: { limit: 20, ttl: 60_000 } })
  @Get('orders/verify/:reference')
  verify(@Param('reference') reference: string) {
    return this.orders.verify(reference);
  }

  /** Paystack webhook — set this URL in the Paystack dashboard. */
  @SkipThrottle()
  @ApiExcludeEndpoint()
  @Post('payments/paystack/webhook')
  @HttpCode(200)
  async webhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('x-paystack-signature') signature: string | undefined,
    @Body() body: Record<string, unknown>,
  ) {
    if (!this.paystack.isValidSignature(req.rawBody, signature)) {
      throw new UnauthorizedException('Invalid signature');
    }
    await this.orders.handleWebhook(body);
    return { received: true };
  }
}

@ApiTags('Admin · Orders')
@ApiBearerAuth()
@Roles(...STAFF_ROLES)
@Controller('admin/orders')
export class AdminOrdersController {
  constructor(private readonly orders: OrdersService) {}

  @Get()
  list(@Query() query: OrderQueryDto) {
    return this.orders.list(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.orders.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateOrderDto) {
    return this.orders.update(id, dto);
  }
}

@Module({
  controllers: [OrdersController, AdminOrdersController],
  providers: [OrdersService, PaystackService],
})
export class OrdersModule {}
