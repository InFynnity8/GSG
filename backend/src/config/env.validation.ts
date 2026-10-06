import * as Joi from 'joi';

/**
 * Validated at boot. The app refuses to start if a required variable is
 * missing or malformed, so misconfiguration fails fast on Render instead of at
 * the first request.
 */
export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().port().default(3000),
  APP_URL: Joi.string().uri().default('http://localhost:3000'),

  // Comma-separated list of allowed browser origins
  CORS_ORIGINS: Joi.string().default('http://localhost:3000'),

  // Neon Postgres
  DATABASE_URL: Joi.string()
    .uri({ scheme: ['postgres', 'postgresql'] })
    .required(),
  DIRECT_URL: Joi.string().uri({ scheme: ['postgres', 'postgresql'] }),

  // Auth
  JWT_SECRET: Joi.string().min(32).required(),
  JWT_EXPIRES_IN: Joi.string().default('1d'),

  // Neon Object Storage (S3-compatible). Optional so the API can boot before
  // the bucket exists; media endpoints answer 503 until these are set.
  AWS_ENDPOINT_URL_S3: Joi.string().uri().allow(''),
  AWS_REGION: Joi.string().default('us-east-2'),
  AWS_ACCESS_KEY_ID: Joi.string().allow(''),
  AWS_SECRET_ACCESS_KEY: Joi.string().allow(''),
  STORAGE_BUCKET: Joi.string().default('gsg-media'),
  STORAGE_PUBLIC_BASE_URL: Joi.string().uri().allow(''),
  STORAGE_MAX_UPLOAD_MB: Joi.number().positive().default(10),
  STORAGE_MAX_PRESIGNED_UPLOAD_MB: Joi.number().positive().default(200),

  // Paystack
  PAYSTACK_SECRET_KEY: Joi.string().allow(''),
  PAYSTACK_PUBLIC_KEY: Joi.string().allow(''),

  // Resend (email). Optional: without a key, emails are skipped.
  RESEND_API_KEY: Joi.string().allow(''),
  MAIL_FROM: Joi.string().default(
    'God Seeking Generation <onboarding@resend.dev>',
  ),
  MAIL_REPLY_TO: Joi.string().email().allow(''),
  MAIL_NOTIFY_TO: Joi.string().allow(''), // comma-separated inboxes
  RESEND_NEWSLETTER_SEGMENT_ID: Joi.string().allow(''),
  WEBSITE_URL: Joi.string().uri().default('http://localhost:3000'),
  MAIL_LOGO_URL: Joi.string().uri().allow(''),
  ADMIN_URL: Joi.string().uri().allow(''),

  SWAGGER_ENABLED: Joi.boolean().default(true),
  THROTTLE_TTL_MS: Joi.number().default(60_000),
  THROTTLE_LIMIT: Joi.number().default(120),
});
