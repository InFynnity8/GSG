import { randomBytes } from 'node:crypto';

/** "Camp Meeting 2026!" -> "camp-meeting-2026" */
export function slugify(input: string): string {
  return input
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

/** Slug with a short random suffix, for tables where titles repeat (events). */
export function uniqueSlug(input: string): string {
  const base = slugify(input) || 'item';
  return `${base}-${randomBytes(3).toString('hex')}`;
}

/** Prisma Decimal | number | null -> number | null (JSON-friendly). */
export function toNumber(value: { toString(): string } | number | null) {
  if (value === null || value === undefined) return null;
  return typeof value === 'number' ? value : Number(value.toString());
}

/** @db.Date column -> "YYYY-MM-DD" (values are stored at UTC midnight). */
export function toDateOnly(value: Date | null): string | null {
  return value ? value.toISOString().slice(0, 10) : null;
}

/** "YYYY-MM-DD" -> Date at UTC midnight, for @db.Date columns. */
export function fromDateOnly(value: string): Date {
  return new Date(`${value}T00:00:00.000Z`);
}

export function todayUtc(): Date {
  return fromDateOnly(new Date().toISOString().slice(0, 10));
}
