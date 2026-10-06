import { matchesSignature } from './storage.service';

describe('matchesSignature', () => {
  const bytes = (hex: string) => Buffer.from(hex.padEnd(24, '0'), 'hex');

  it('recognises real file headers', () => {
    expect(matchesSignature(bytes('ffd8ffe0'), 'image/jpeg')).toBe(true);
    expect(matchesSignature(bytes('89504e470d0a1a0a'), 'image/png')).toBe(true);
    expect(
      matchesSignature(Buffer.from('RIFF\0\0\0\0WEBPVP8 '), 'image/webp'),
    ).toBe(true);
    expect(matchesSignature(Buffer.from('%PDF-1.7'), 'application/pdf')).toBe(
      true,
    );
  });

  it('rejects a file whose bytes do not match its declared type', () => {
    const html = Buffer.from('<html><script>alert(1)</script>');
    expect(matchesSignature(html, 'image/jpeg')).toBe(false);
    expect(matchesSignature(html, 'image/png')).toBe(false);
  });

  it('rejects types that are not on the allow-list', () => {
    expect(matchesSignature(Buffer.from('<svg'), 'image/svg+xml')).toBe(false);
  });
});
