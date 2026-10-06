import { ConfigService } from '@nestjs/config';
import { createHmac } from 'node:crypto';
import { PaystackService } from './paystack.service';

describe('PaystackService.isValidSignature', () => {
  const secret = 'sk_test_secret';
  const service = new PaystackService(
    new ConfigService({ PAYSTACK_SECRET_KEY: secret }),
  );
  const body = Buffer.from(JSON.stringify({ event: 'charge.success' }));
  const sign = (b: Buffer, key = secret) =>
    createHmac('sha512', key).update(b).digest('hex');

  it('accepts a correct signature', () => {
    expect(service.isValidSignature(body, sign(body))).toBe(true);
  });

  it('rejects a signature made with another key', () => {
    expect(service.isValidSignature(body, sign(body, 'other'))).toBe(false);
  });

  it('rejects a tampered body', () => {
    const tampered = Buffer.from(JSON.stringify({ event: 'charge.failed' }));
    expect(service.isValidSignature(tampered, sign(body))).toBe(false);
  });

  it('rejects missing signature or body', () => {
    expect(service.isValidSignature(body, undefined)).toBe(false);
    expect(service.isValidSignature(undefined, sign(body))).toBe(false);
  });

  it('rejects everything when no secret is configured', () => {
    const unconfigured = new PaystackService(new ConfigService({}));
    expect(unconfigured.isValidSignature(body, sign(body, ''))).toBe(false);
  });
});
