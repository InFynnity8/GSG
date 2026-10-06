import {
  BadGatewayException,
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHmac, timingSafeEqual } from 'node:crypto';

const PAYSTACK_API = 'https://api.paystack.co';

export interface PaystackTransaction {
  id: number;
  status: string; // "success" | "failed" | "abandoned" | ...
  reference: string;
  amount: number; // minor units (pesewas)
  currency: string;
  channel?: string;
  paid_at?: string | null;
  customer?: { email?: string };
}

@Injectable()
export class PaystackService {
  private readonly logger = new Logger(PaystackService.name);
  private readonly secretKey: string;
  readonly publicKey: string;

  constructor(config: ConfigService) {
    this.secretKey = config.get<string>('PAYSTACK_SECRET_KEY', '');
    this.publicKey = config.get<string>('PAYSTACK_PUBLIC_KEY', '');
  }

  ensureConfigured() {
    if (!this.secretKey) {
      throw new ServiceUnavailableException('Payments are not configured');
    }
  }

  private async call<T>(path: string, init?: RequestInit): Promise<T> {
    this.ensureConfigured();
    const res = await fetch(`${PAYSTACK_API}${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${this.secretKey}`,
        'Content-Type': 'application/json',
        ...init?.headers,
      },
      signal: AbortSignal.timeout(15_000),
    });
    const body = (await res.json().catch(() => null)) as {
      status?: boolean;
      message?: string;
      data?: T;
    } | null;
    if (!res.ok || !body?.status || !body.data) {
      this.logger.warn(
        `Paystack ${path} failed: ${res.status} ${body?.message}`,
      );
      throw new BadGatewayException('Payment provider error');
    }
    return body.data;
  }

  /** Server-side initialize so the amount can't be tampered with in the browser. */
  initialize(params: {
    email: string;
    amountMinor: number;
    currency: string;
    reference: string;
    metadata?: Record<string, unknown>;
  }) {
    return this.call<{
      authorization_url: string;
      access_code: string;
      reference: string;
    }>('/transaction/initialize', {
      method: 'POST',
      body: JSON.stringify({
        email: params.email,
        amount: String(params.amountMinor),
        currency: params.currency,
        reference: params.reference,
        metadata: params.metadata,
      }),
    });
  }

  verify(reference: string) {
    return this.call<PaystackTransaction>(
      `/transaction/verify/${encodeURIComponent(reference)}`,
    );
  }

  /** x-paystack-signature = HMAC-SHA512(raw body, secret key), hex. */
  isValidSignature(rawBody: Buffer | undefined, signature: string | undefined) {
    if (!this.secretKey || !rawBody || !signature) return false;
    const expected = createHmac('sha512', this.secretKey)
      .update(rawBody)
      .digest('hex');
    const a = Buffer.from(expected, 'utf8');
    const b = Buffer.from(signature, 'utf8');
    return a.length === b.length && timingSafeEqual(a, b);
  }
}
