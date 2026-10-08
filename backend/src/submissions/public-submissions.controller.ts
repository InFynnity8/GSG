import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { Public } from '../common/decorators/auth.decorators';
import {
  PaginationQueryDto,
  pageArgs,
  paginated,
} from '../common/dto/pagination.dto';
import { MailService } from '../mail/mail.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateContactMessageDto,
  CreatePrayerRequestDto,
  CreateTestimonyDto,
  SubscribeDto,
  UnsubscribeDto,
} from './dto/submission.dto';

// Forms: 5 submissions per IP per 10 minutes
const FORM_LIMIT = { default: { limit: 5, ttl: 10 * 60_000 } };
const OK = { success: true };

@ApiTags('Public · Forms')
@Public()
@Controller()
export class PublicSubmissionsController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mail: MailService,
  ) {}

  @Throttle(FORM_LIMIT)
  @Post('contact')
  @HttpCode(201)
  async contact(@Body() { website, ...dto }: CreateContactMessageDto) {
    if (website) return OK; // honeypot tripped: pretend success, store nothing
    const message = await this.prisma.contactMessage.create({ data: dto });
    void this.mail.contactReceived(message);
    return OK;
  }

  /** Idempotent; always returns the same response (no email enumeration). */
  @Throttle(FORM_LIMIT)
  @Post('newsletter/subscribe')
  @HttpCode(200)
  async subscribe(@Body() { website, email, name }: SubscribeDto) {
    if (website) return OK;
    // Double opt-in: nothing is subscribed until the owner of the address
    // clicks the confirmation link. Existing rows keep their stored name, and
    // an already-active subscriber gets no extra email.
    const existing = await this.prisma.newsletterSubscriber.findUnique({
      where: { email },
    });
    if (existing?.status === 'SUBSCRIBED') return OK;
    const subscriber = existing
      ? await this.prisma.newsletterSubscriber.update({
          where: { email },
          data: { status: 'PENDING' },
        })
      : await this.prisma.newsletterSubscriber.create({
          data: { email, name, status: 'PENDING' },
        });
    void this.mail.newsletterConfirmRequest(
      subscriber.email,
      subscriber.unsubscribeToken,
    );
    return OK;
  }

  /** Second step of double opt-in: the link in the confirmation email. */
  @Throttle(FORM_LIMIT)
  @Post('newsletter/confirm')
  @HttpCode(200)
  async confirm(@Body() { token }: UnsubscribeDto) {
    const subscriber = await this.prisma.newsletterSubscriber.findUnique({
      where: { unsubscribeToken: token },
    });
    if (subscriber?.status === 'PENDING') {
      await this.prisma.newsletterSubscriber.update({
        where: { id: subscriber.id },
        data: {
          status: 'SUBSCRIBED',
          unsubscribedAt: null,
          subscribedAt: new Date(),
        },
      });
      void this.mail.newsletterSubscribed({ ...subscriber, isNew: true });
    }
    return OK;
  }

  @Throttle(FORM_LIMIT)
  @Post('newsletter/unsubscribe')
  @HttpCode(200)
  async unsubscribe(@Body() { token }: UnsubscribeDto) {
    const subscriber = await this.prisma.newsletterSubscriber.findUnique({
      where: { unsubscribeToken: token },
    });
    if (subscriber && subscriber.status !== 'UNSUBSCRIBED') {
      await this.prisma.newsletterSubscriber.update({
        where: { id: subscriber.id },
        data: { status: 'UNSUBSCRIBED', unsubscribedAt: new Date() },
      });
      void this.mail.newsletterUnsubscribed(subscriber.email);
    }
    return OK;
  }

  @Throttle(FORM_LIMIT)
  @Post('prayer-requests')
  @HttpCode(201)
  async prayerRequest(@Body() { website, ...dto }: CreatePrayerRequestDto) {
    if (website) return OK;
    const request = await this.prisma.prayerRequest.create({
      data: dto.isAnonymous
        ? { ...dto, name: null, email: null, phone: null }
        : dto,
    });
    void this.mail.prayerReceived(request);
    return OK;
  }

  @Throttle(FORM_LIMIT)
  @Post('testimonies')
  @HttpCode(201)
  async testimony(@Body() { website, ...dto }: CreateTestimonyDto) {
    if (website) return OK;
    const testimony = await this.prisma.testimony.create({ data: dto }); // PENDING until approved
    void this.mail.testimonyReceived(testimony);
    return OK;
  }

  /** Approved testimonies only; email is never exposed. */
  @Get('testimonies')
  async testimonies(@Query() query: PaginationQueryDto) {
    const where = { status: 'APPROVED' as const };
    const [rows, total] = await this.prisma.$transaction([
      this.prisma.testimony.findMany({
        where,
        select: {
          id: true,
          name: true,
          title: true,
          content: true,
          imageUrl: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
        ...pageArgs(query),
      }),
      this.prisma.testimony.count({ where }),
    ]);
    return paginated(rows, total, query);
  }
}
