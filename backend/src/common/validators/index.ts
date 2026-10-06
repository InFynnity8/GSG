import { Transform } from 'class-transformer';
import {
  isURL,
  Matches,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

/** "HH:mm" or "HH:mm:ss", 24h clock */
export const IsTimeOfDay = () =>
  Matches(/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/, {
    message: '$property must be a 24h time like 18:30',
  });

/** "YYYY-MM-DD" */
export const IsDateOnly = () =>
  Matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, {
    message: '$property must be a date like 2026-12-31',
  });

/** Absolute http(s) URL only — blocks javascript:, data: and friends. */
export function IsHttpUrl(options?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isHttpUrl',
      target: object.constructor,
      propertyName,
      options: { message: '$property must be an http(s) URL', ...options },
      validator: {
        validate: (value: unknown) =>
          typeof value === 'string' &&
          isURL(value, {
            protocols: ['http', 'https'],
            require_protocol: true,
            require_tld: false,
          }),
      },
    });
  };
}

/**
 * Image/video location: an uploaded file (http(s) URL) or an asset bundled
 * with the website (site-relative path like "/images/hq.jpg").
 */
export function IsMediaUrl(options?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isMediaUrl',
      target: object.constructor,
      propertyName,
      options: {
        message: '$property must be an http(s) URL or a path starting with /',
        ...options,
      },
      validator: {
        validate: (value: unknown) =>
          typeof value === 'string' &&
          ((value.startsWith('/') && !value.startsWith('//')) ||
            isURL(value, {
              protocols: ['http', 'https'],
              require_protocol: true,
              require_tld: false,
            })),
      },
    });
  };
}

/** Site-relative path ("/give") or absolute http(s) URL — for buttons/links. */
export function IsHref(options?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isHref',
      target: object.constructor,
      propertyName,
      options: {
        message: '$property must be a path starting with / or an http(s) URL',
        ...options,
      },
      validator: {
        validate: (value: unknown) =>
          typeof value === 'string' &&
          ((value.startsWith('/') && !value.startsWith('//')) ||
            value.startsWith('#') ||
            isURL(value, {
              protocols: ['http', 'https'],
              require_protocol: true,
            })),
      },
    });
  };
}

/** Query-string boolean: only "true"/"1" are true ("false" stays false). */
export const ToBoolean = () =>
  Transform(({ value }: { value: unknown }) => {
    if (typeof value === 'boolean') return value;
    if (value === undefined || value === null || value === '') return undefined;
    return value === 'true' || value === '1';
  });

/** Trim strings, and turn blank strings into null so optional fields clear. */
export const Trim = () =>
  Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  );

/** Trim + lowercase, for email addresses. */
export const LowerTrim = () =>
  Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  );

export const TrimToNull = () =>
  Transform(({ value }: { value: unknown }) => {
    if (typeof value !== 'string') return value;
    const trimmed = value.trim();
    return trimmed === '' ? null : trimmed;
  });
