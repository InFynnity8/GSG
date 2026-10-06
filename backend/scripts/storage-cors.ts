/**
 * Applies the CORS policy to the Neon storage bucket so the admin panel can
 * upload large files straight to storage with presigned PUT URLs.
 *
 *   npm run storage:cors
 *
 * Allowed origins come from CORS_ORIGINS. Re-run whenever that changes.
 */
import 'dotenv/config';
import {
  GetBucketCorsCommand,
  PutBucketCorsCommand,
  S3Client,
} from '@aws-sdk/client-s3';

async function main() {
  const bucket = process.env.STORAGE_BUCKET || 'gsg-media';
  const origins = (process.env.CORS_ORIGINS ?? '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);
  if (!origins.length) throw new Error('CORS_ORIGINS is empty');

  const s3 = new S3Client({
    endpoint: process.env.AWS_ENDPOINT_URL_S3,
    region: process.env.AWS_REGION || 'us-east-2',
    forcePathStyle: true,
  });

  await s3.send(
    new PutBucketCorsCommand({
      Bucket: bucket,
      CORSConfiguration: {
        CORSRules: [
          {
            AllowedOrigins: origins,
            AllowedMethods: ['GET', 'HEAD', 'PUT'],
            AllowedHeaders: ['content-type'],
            ExposeHeaders: ['ETag'],
            MaxAgeSeconds: 3600,
          },
        ],
      },
    }),
  );
  const current = await s3.send(new GetBucketCorsCommand({ Bucket: bucket }));
  console.log(`✔ CORS applied to "${bucket}":`, JSON.stringify(current.CORSRules));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
