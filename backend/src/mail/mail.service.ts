import {
  BadGatewayException,
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import * as t from './templates';

interface Mail {
  subject: string;
  html: string;
  text: string;
}

/**
 * Transactional email + newsletter contacts via Resend.
 *
 * Every public method is "best effort": it logs failures instead of throwing,
 * so a form submission still succeeds if email delivery has a problem.
 * Call them without awaiting (`void this.mail.x(...)`) from request handlers.
 */
@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly resend: Resend | null;
  private readonly from: string;
  private readonly replyTo?: string;
  private readonly notifyTo: string[];
  private readonly segmentId?: string;
  private readonly brand: t.Brand;
  private readonly adminUrl: string;

  constructor(config: ConfigService) {
    const apiKey = config.get<string>('RESEND_API_KEY');
    this.resend = apiKey ? new Resend(apiKey) : null;
    this.from = config.get<string>(
      'MAIL_FROM',
      'God Seeking Generation <onboarding@resend.dev>',
    );
    this.replyTo = config.get<string>('MAIL_REPLY_TO') || undefined;
    this.notifyTo = config
      .get<string>('MAIL_NOTIFY_TO', '')
      .split(',')
      .map((e) => e.trim())
      .filter(Boolean);
    this.segmentId =
      config.get<string>('RESEND_NEWSLETTER_SEGMENT_ID') || undefined;
    const websiteUrl = config
      .get<string>('WEBSITE_URL', 'http://localhost:3000')
      .replace(/\/$/, '');
    this.brand = {
      churchName: 'God Seeking Generation',
      websiteUrl,
      // Same logo as the website header (web/public/GSG.png) unless overridden
      logoUrl: config.get<string>('MAIL_LOGO_URL') || `${websiteUrl}/GSG.png`,
      tagline: "Seeking God's Face",
    };
    this.adminUrl = config
      .get<string>('ADMIN_URL', this.brand.websiteUrl)
      .replace(/\/$/, '');

    if (!this.resend) {
      this.logger.warn('RESEND_API_KEY not set — emails will be skipped');
    }
  }

  get isConfigured() {
    return this.resend !== null;
  }

  // ── Website forms ─────────────────────────────────────────────────────────

  async contactReceived(m: {
    id: string;
    name: string;
    email: string;
    phone?: string | null;
    subject?: string | null;
    message: string;
  }) {
    await Promise.all([
      this.toChurch(t.contactNotification(this.brand, m), {
        replyTo: m.email,
        key: `contact-notify-${m.id}`,
      }),
      this.send(m.email, t.contactAutoReply(this.brand, m), {
        key: `contact-reply-${m.id}`,
      }),
    ]);
  }

  async prayerReceived(r: {
    id: string;
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    request: string;
    isAnonymous?: boolean;
  }) {
    await Promise.all([
      this.toChurch(t.prayerNotification(this.brand, r), {
        key: `prayer-notify-${r.id}`,
      }),
      r.email && !r.isAnonymous
        ? this.send(r.email, t.prayerAcknowledgement(this.brand, r), {
            key: `prayer-ack-${r.id}`,
          })
        : null,
    ]);
  }

  async testimonyReceived(x: {
    id: string;
    name: string;
    title?: string | null;
    content: string;
  }) {
    await this.toChurch(
      t.testimonyNotification(this.brand, x, `${this.adminUrl}/testimonies`),
      { key: `testimony-notify-${x.id}` },
    );
  }

  async orderPaid(o: {
    id: string;
    reference: string;
    itemName: string;
    size?: string | null;
    quantity: number;
    amount: number;
    currency: string;
    buyerName: string;
    buyerEmail: string;
    buyerPhone?: string | null;
    paidAt: Date | null;
  }) {
    await Promise.all([
      this.send(o.buyerEmail, t.orderReceipt(this.brand, o), {
        key: `order-receipt-${o.id}`,
      }),
      this.toChurch(t.orderNotification(this.brand, o), {
        replyTo: o.buyerEmail,
        key: `order-notify-${o.id}`,
      }),
    ]);
  }

  // ── Newsletter ────────────────────────────────────────────────────────────

  unsubscribeUrl(token: string) {
    return `${this.brand.websiteUrl}/newsletter/unsubscribe?token=${encodeURIComponent(token)}`;
  }

  async newsletterSubscribed(s: {
    email: string;
    name?: string | null;
    unsubscribeToken: string;
    isNew: boolean;
  }) {
    await this.syncContact(s.email, false, s.name);
    if (!s.isNew) return; // re-subscribing: no repeat welcome email
    const unsubscribeUrl = this.unsubscribeUrl(s.unsubscribeToken);
    await this.send(
      s.email,
      t.newsletterWelcome(this.brand, { ...s, unsubscribeUrl }),
      {
        key: `welcome-${s.unsubscribeToken}`,
        headers: {
          'List-Unsubscribe': `<${unsubscribeUrl}>`,
        },
      },
    );
  }

  async newsletterUnsubscribed(email: string) {
    await this.syncContact(email, true);
  }

  /**
   * Sends a newsletter to the Resend segment as a Broadcast. Resend handles
   * per-recipient unsubscribe links via {{{RESEND_UNSUBSCRIBE_URL}}}.
   * Throws (unlike the transactional helpers) so the admin sees the error.
   */
  async sendBroadcast(b: {
    subject: string;
    html: string;
    previewText?: string;
  }) {
    if (!this.resend) {
      throw new ServiceUnavailableException('Email is not configured');
    }
    if (!this.segmentId) {
      throw new ServiceUnavailableException(
        'RESEND_NEWSLETTER_SEGMENT_ID is not set',
      );
    }
    // Resend replaces this placeholder with each recipient's unsubscribe link.
    const footer = `You are receiving this because you subscribed on our website. <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:${t.THEME.mutedFg};">Unsubscribe</a> · `;
    const { data, error } = await this.resend.broadcasts.create({
      segmentId: this.segmentId,
      from: this.from,
      replyTo: this.replyTo,
      subject: b.subject,
      previewText: b.previewText,
      name: b.subject,
      html: t.layout(this.brand, b.subject, b.html, footer),
      send: true,
    });
    if (error || !data) {
      this.logger.error(`Broadcast failed: ${error?.message}`);
      throw new BadGatewayException(error?.message ?? 'Broadcast failed');
    }
    return { id: data.id };
  }

  /** Pushes existing subscribers into Resend (e.g. after first configuring it). */
  async syncContacts(
    subscribers: { email: string; name: string | null; status: string }[],
  ) {
    if (!this.resend) {
      throw new ServiceUnavailableException('Email is not configured');
    }
    for (const s of subscribers) {
      await this.syncContact(s.email, s.status !== 'SUBSCRIBED', s.name);
      await new Promise((r) => setTimeout(r, 250)); // stay under Resend's rate limit
    }
    return { synced: subscribers.length };
  }

  // ── Internals ─────────────────────────────────────────────────────────────

  private async toChurch(
    mail: Mail,
    opts: { replyTo?: string; key?: string } = {},
  ) {
    if (!this.notifyTo.length) {
      if (this.resend)
        this.logger.warn('MAIL_NOTIFY_TO is empty — notification skipped');
      return;
    }
    await this.send(this.notifyTo, mail, opts);
  }

  private async send(
    to: string | string[],
    mail: Mail,
    opts: {
      replyTo?: string;
      key?: string;
      headers?: Record<string, string>;
    } = {},
  ) {
    if (!this.resend) return;
    try {
      const { error } = await this.resend.emails.send(
        {
          from: this.from,
          to,
          replyTo: opts.replyTo ?? this.replyTo,
          subject: mail.subject,
          html: mail.html,
          text: mail.text,
          headers: opts.headers,
        },
        opts.key ? { idempotencyKey: opts.key } : undefined,
      );
      if (error)
        this.logger.error(`Email "${mail.subject}" failed: ${error.message}`);
    } catch (error) {
      this.logger.error(`Email "${mail.subject}" failed: ${String(error)}`);
    }
  }

  /** Keeps the Resend contact (used for broadcasts) in step with our table. */
  private async syncContact(
    email: string,
    unsubscribed: boolean,
    name?: string | null,
  ) {
    if (!this.resend) return;
    try {
      const { error } = await this.resend.contacts.create({
        email,
        firstName: name ?? undefined,
        unsubscribed,
        ...(this.segmentId ? { segments: [{ id: this.segmentId }] } : {}),
      });
      if (!error) return;
      // Already exists -> update instead
      const updated = await this.resend.contacts.update({
        email,
        unsubscribed,
        ...(name ? { firstName: name } : {}),
      });
      if (updated.error) {
        this.logger.error(`Contact sync failed: ${updated.error.message}`);
      }
    } catch (error) {
      this.logger.error(`Contact sync failed: ${String(error)}`);
    }
  }
}
