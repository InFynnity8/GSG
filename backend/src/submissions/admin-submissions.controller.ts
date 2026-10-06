import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles, STAFF_ROLES } from '../common/decorators/auth.decorators';
import { pageArgs, paginated } from '../common/dto/pagination.dto';
import { MailService } from '../mail/mail.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  BroadcastDto,
  MessageQueryDto,
  PrayerQueryDto,
  SubscriberQueryDto,
  TestimonyQueryDto,
  UpdateMessageStatusDto,
  UpdatePrayerStatusDto,
  UpdateTestimonyDto,
} from './dto/submission.dto';

const contains = (search?: string) =>
  search ? { contains: search, mode: 'insensitive' as const } : undefined;

/** Escape a CSV cell, and neutralise spreadsheet formula injection. */
const csvCell = (value: string | null) => {
  let s = value ?? '';
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
};

@ApiTags('Admin · Submissions')
@ApiBearerAuth()
@Roles(...STAFF_ROLES)
@Controller('admin')
export class AdminSubmissionsController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mail: MailService,
  ) {}

  // ── Contact messages ──────────────────────────────────────────────────────
  @Get('contact-messages')
  async messages(@Query() query: MessageQueryDto) {
    const where = {
      ...(query.status ? { status: query.status } : {}),
      ...(query.search
        ? {
            OR: [
              { name: contains(query.search) },
              { email: contains(query.search) },
              { message: contains(query.search) },
            ],
          }
        : {}),
    };
    const [rows, total] = await this.prisma.$transaction([
      this.prisma.contactMessage.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        ...pageArgs(query),
      }),
      this.prisma.contactMessage.count({ where }),
    ]);
    return paginated(rows, total, query);
  }

  @Patch('contact-messages/:id')
  updateMessage(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateMessageStatusDto,
  ) {
    return this.prisma.contactMessage.update({ where: { id }, data: dto });
  }

  @Delete('contact-messages/:id')
  @HttpCode(204)
  async deleteMessage(@Param('id', ParseUUIDPipe) id: string) {
    await this.prisma.contactMessage.delete({ where: { id } });
  }

  // ── Newsletter ────────────────────────────────────────────────────────────
  @Get('newsletter-subscribers')
  async subscribers(@Query() query: SubscriberQueryDto) {
    const where = {
      ...(query.status ? { status: query.status } : {}),
      ...(query.search ? { email: contains(query.search) } : {}),
    };
    const [rows, total] = await this.prisma.$transaction([
      this.prisma.newsletterSubscriber.findMany({
        where,
        orderBy: { subscribedAt: 'desc' },
        ...pageArgs(query),
      }),
      this.prisma.newsletterSubscriber.count({ where }),
    ]);
    return paginated(rows, total, query);
  }

  @Get('newsletter-subscribers/export.csv')
  @Header('Content-Type', 'text/csv; charset=utf-8')
  @Header('Content-Disposition', 'attachment; filename="subscribers.csv"')
  async exportSubscribers() {
    const rows = await this.prisma.newsletterSubscriber.findMany({
      where: { status: 'SUBSCRIBED' },
      orderBy: { subscribedAt: 'asc' },
    });
    const lines = rows.map((r) =>
      [r.email, r.name, r.subscribedAt.toISOString()].map(csvCell).join(','),
    );
    return ['email,name,subscribed_at', ...lines].join('\n');
  }

  @Delete('newsletter-subscribers/:id')
  @HttpCode(204)
  async deleteSubscriber(@Param('id', ParseUUIDPipe) id: string) {
    const subscriber = await this.prisma.newsletterSubscriber.delete({
      where: { id },
    });
    void this.mail.newsletterUnsubscribed(subscriber.email);
  }

  /** Send a newsletter to every subscriber via a Resend Broadcast. */
  @Post('newsletter/broadcasts')
  sendBroadcast(@Body() dto: BroadcastDto) {
    return this.mail.sendBroadcast(dto);
  }

  /** Copy all subscribers into the Resend segment (run once after setup). */
  @Post('newsletter/sync')
  async syncSubscribers() {
    const subscribers = await this.prisma.newsletterSubscriber.findMany({
      select: { email: true, name: true, status: true },
    });
    return this.mail.syncContacts(subscribers);
  }

  // ── Prayer requests ───────────────────────────────────────────────────────
  @Get('prayer-requests')
  async prayerRequests(@Query() query: PrayerQueryDto) {
    const where = {
      ...(query.status ? { status: query.status } : {}),
      ...(query.search ? { request: contains(query.search) } : {}),
    };
    const [rows, total] = await this.prisma.$transaction([
      this.prisma.prayerRequest.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        ...pageArgs(query),
      }),
      this.prisma.prayerRequest.count({ where }),
    ]);
    return paginated(rows, total, query);
  }

  @Patch('prayer-requests/:id')
  updatePrayer(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdatePrayerStatusDto,
  ) {
    return this.prisma.prayerRequest.update({ where: { id }, data: dto });
  }

  @Delete('prayer-requests/:id')
  @HttpCode(204)
  async deletePrayer(@Param('id', ParseUUIDPipe) id: string) {
    await this.prisma.prayerRequest.delete({ where: { id } });
  }

  // ── Testimonies ───────────────────────────────────────────────────────────
  @Get('testimonies')
  async testimonies(@Query() query: TestimonyQueryDto) {
    const where = {
      ...(query.status ? { status: query.status } : {}),
      ...(query.search
        ? {
            OR: [
              { name: contains(query.search) },
              { content: contains(query.search) },
            ],
          }
        : {}),
    };
    const [rows, total] = await this.prisma.$transaction([
      this.prisma.testimony.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        ...pageArgs(query),
      }),
      this.prisma.testimony.count({ where }),
    ]);
    return paginated(rows, total, query);
  }

  @Patch('testimonies/:id')
  updateTestimony(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateTestimonyDto,
  ) {
    return this.prisma.testimony.update({ where: { id }, data: dto });
  }

  @Delete('testimonies/:id')
  @HttpCode(204)
  async deleteTestimony(@Param('id', ParseUUIDPipe) id: string) {
    await this.prisma.testimony.delete({ where: { id } });
  }
}
