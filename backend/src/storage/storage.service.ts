import {
  BadRequestException,
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DeleteObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'node:crypto';

/** Allowed upload types -> file extension. SVG is excluded on purpose (XSS). */
export const ALLOWED_MIME_TYPES: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/avif': 'avif',
  'video/mp4': 'mp4',
  'video/webm': 'webm',
  'application/pdf': 'pdf',
};

export const MEDIA_FOLDERS = [
  'events',
  'books',
  'merchandise',
  'hero',
  'leaders',
  'branches',
  'departments',
  'testimonies',
  'giving',
  'site',
  'misc',
] as const;
export type MediaFolder = (typeof MEDIA_FOLDERS)[number];

/**
 * Neon Object Storage (S3-compatible, path-style addressing, SigV4).
 * The bucket is expected to be `public_read`, so stored files are served
 * directly from `${endpoint}/${bucket}/${key}` and only writes need signing.
 */
@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  private readonly client: S3Client | null;
  readonly bucket: string;
  private readonly publicBaseUrl: string;
  readonly maxUploadBytes: number;
  readonly maxPresignedUploadBytes: number;

  constructor(config: ConfigService) {
    const endpoint = config.get<string>('AWS_ENDPOINT_URL_S3');
    const accessKeyId = config.get<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = config.get<string>('AWS_SECRET_ACCESS_KEY');
    this.bucket = config.get<string>('STORAGE_BUCKET', 'gsg-media');
    this.maxUploadBytes =
      config.get<number>('STORAGE_MAX_UPLOAD_MB', 10) * 1024 * 1024;
    this.maxPresignedUploadBytes =
      config.get<number>('STORAGE_MAX_PRESIGNED_UPLOAD_MB', 200) * 1024 * 1024;

    const base =
      config.get<string>('STORAGE_PUBLIC_BASE_URL') ||
      (endpoint ? `${endpoint.replace(/\/$/, '')}/${this.bucket}` : '');
    this.publicBaseUrl = base.replace(/\/$/, '');

    if (endpoint && accessKeyId && secretAccessKey) {
      this.client = new S3Client({
        endpoint,
        region: config.get<string>('AWS_REGION', 'us-east-2'),
        credentials: { accessKeyId, secretAccessKey },
        forcePathStyle: true, // required by Neon
      });
    } else {
      this.client = null;
      this.logger.warn(
        'Object storage is not configured — media endpoints will return 503',
      );
    }
  }

  get isConfigured() {
    return this.client !== null;
  }

  private get s3(): S3Client {
    if (!this.client) {
      throw new ServiceUnavailableException('File storage is not configured');
    }
    return this.client;
  }

  publicUrl(key: string) {
    return `${this.publicBaseUrl}/${key.split('/').map(encodeURIComponent).join('/')}`;
  }

  /** Server-generated key: never trust client file names in paths. */
  buildKey(folder: MediaFolder, mimeType: string) {
    const ext = ALLOWED_MIME_TYPES[mimeType];
    if (!ext)
      throw new BadRequestException(`Unsupported file type: ${mimeType}`);
    const now = new Date();
    const month = String(now.getUTCMonth() + 1).padStart(2, '0');
    return `${folder}/${now.getUTCFullYear()}/${month}/${randomUUID()}.${ext}`;
  }

  async putObject(key: string, body: Buffer, contentType: string) {
    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: body,
        ContentType: contentType,
        CacheControl: 'public, max-age=31536000, immutable',
      }),
    );
  }

  /** Presigned PUT for large files (videos) uploaded straight from the browser. */
  async presignPut(key: string, contentType: string, expiresIn = 600) {
    const url = await getSignedUrl(
      this.s3,
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        ContentType: contentType,
      }),
      { expiresIn, signableHeaders: new Set(['content-type']) },
    );
    return { url, expiresIn };
  }

  async head(key: string) {
    try {
      const res = await this.s3.send(
        new HeadObjectCommand({ Bucket: this.bucket, Key: key }),
      );
      return { size: res.ContentLength ?? 0, contentType: res.ContentType };
    } catch (error) {
      const status = (error as { $metadata?: { httpStatusCode?: number } })
        .$metadata?.httpStatusCode;
      if (status === 404) return null;
      throw error;
    }
  }

  async deleteObject(key: string) {
    await this.s3.send(
      new DeleteObjectCommand({ Bucket: this.bucket, Key: key }),
    );
  }
}

/** Checks the first bytes of an upload match its declared image/video/pdf type. */
export function matchesSignature(buffer: Buffer, mimeType: string): boolean {
  const hex = buffer.subarray(0, 12).toString('hex');
  const ascii = buffer.subarray(0, 12).toString('latin1');
  switch (mimeType) {
    case 'image/jpeg':
      return hex.startsWith('ffd8ff');
    case 'image/png':
      return hex.startsWith('89504e470d0a1a0a');
    case 'image/gif':
      return ascii.startsWith('GIF87a') || ascii.startsWith('GIF89a');
    case 'image/webp':
      return ascii.startsWith('RIFF') && ascii.slice(8, 12) === 'WEBP';
    case 'image/avif':
      return ascii.slice(4, 12).startsWith('ftypavi');
    case 'video/mp4':
      return ascii.slice(4, 8) === 'ftyp';
    case 'video/webm':
      return hex.startsWith('1a45dfa3');
    case 'application/pdf':
      return ascii.startsWith('%PDF-');
    default:
      return false;
  }
}
