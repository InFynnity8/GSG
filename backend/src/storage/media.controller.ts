import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import {
  CONTENT_ROLES,
  CurrentUser,
  Roles,
} from '../common/decorators/auth.decorators';
import type { AuthUser } from '../common/decorators/auth.decorators';
import { pageArgs, paginated } from '../common/dto/pagination.dto';
import { PrismaService } from '../prisma/prisma.service';
import {
  ConfirmUploadDto,
  MediaQueryDto,
  PresignUploadDto,
  UploadMediaDto,
} from './dto/media.dto';
import {
  ALLOWED_MIME_TYPES,
  matchesSignature,
  StorageService,
} from './storage.service';
import type { MediaFolder } from './storage.service';

// Hard ceiling for the in-memory multipart parser; the configurable
// STORAGE_MAX_UPLOAD_MB limit is checked below and must be <= this.
const MULTER_HARD_LIMIT = 25 * 1024 * 1024;

@ApiTags('Admin · Media')
@ApiBearerAuth()
@Roles(...CONTENT_ROLES)
@Controller('admin/media')
export class MediaController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storage: StorageService,
  ) {}

  @Get()
  async list(@Query() query: MediaQueryDto) {
    const where = query.folder ? { folder: query.folder } : {};
    const [data, total] = await this.prisma.$transaction([
      this.prisma.mediaAsset.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        ...pageArgs(query),
      }),
      this.prisma.mediaAsset.count({ where }),
    ]);
    return paginated(data, total, query);
  }

  /** Small files (images, PDFs): multipart upload through the API. */
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: MULTER_HARD_LIMIT, files: 1 },
    }),
  )
  async upload(
    @UploadedFile() file: Express.Multer.File | undefined,
    @Body() dto: UploadMediaDto,
    @CurrentUser() user: AuthUser,
  ) {
    if (!file) throw new BadRequestException('A "file" field is required');
    if (file.size > this.storage.maxUploadBytes) {
      throw new BadRequestException(
        'File is too large for direct upload — use /admin/media/presign',
      );
    }
    if (
      !ALLOWED_MIME_TYPES[file.mimetype] ||
      !matchesSignature(file.buffer, file.mimetype)
    ) {
      throw new BadRequestException('Unsupported or mismatched file type');
    }

    const key = this.storage.buildKey(dto.folder, file.mimetype);
    await this.storage.putObject(key, file.buffer, file.mimetype);
    return this.record(key, file.mimetype, file.size, dto.folder, user, {
      originalName: file.originalname,
      altText: dto.altText,
    });
  }

  /**
   * Large files (videos): step 1 — get a short-lived presigned PUT URL.
   * The browser must send the same Content-Type header.
   */
  @Post('presign')
  async presign(@Body() dto: PresignUploadDto) {
    if (dto.size > this.storage.maxPresignedUploadBytes) {
      throw new BadRequestException('File is too large');
    }
    const key = this.storage.buildKey(dto.folder, dto.contentType);
    const { url, expiresIn } = await this.storage.presignPut(
      key,
      dto.contentType,
    );
    return {
      key,
      uploadUrl: url,
      method: 'PUT',
      headers: { 'Content-Type': dto.contentType },
      expiresIn,
      publicUrl: this.storage.publicUrl(key),
    };
  }

  /** Large files: step 2 — verify the object landed and register it. */
  @Post('confirm')
  async confirm(@Body() dto: ConfirmUploadDto, @CurrentUser() user: AuthUser) {
    const head = await this.storage.head(dto.key);
    if (!head) throw new BadRequestException('Upload not found in storage');

    const mimeType = head.contentType ?? '';
    const tooBig = head.size > this.storage.maxPresignedUploadBytes;
    if (tooBig || !ALLOWED_MIME_TYPES[mimeType]) {
      await this.storage.deleteObject(dto.key);
      throw new BadRequestException('Uploaded file was rejected');
    }

    return this.record(
      dto.key,
      mimeType,
      head.size,
      dto.key.split('/')[0] as MediaFolder,
      user,
      { originalName: dto.fileName, altText: dto.altText },
    );
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const asset = await this.prisma.mediaAsset.findUniqueOrThrow({
      where: { id },
    });
    await this.storage.deleteObject(asset.key);
    await this.prisma.mediaAsset.delete({ where: { id } });
  }

  private record(
    key: string,
    mimeType: string,
    sizeBytes: number,
    folder: MediaFolder,
    user: AuthUser,
    extra: { originalName?: string; altText?: string },
  ) {
    return this.prisma.mediaAsset.upsert({
      where: { key },
      update: { altText: extra.altText },
      create: {
        key,
        bucket: this.storage.bucket,
        url: this.storage.publicUrl(key),
        mimeType,
        sizeBytes,
        folder,
        uploadedById: user.id,
        originalName: extra.originalName?.slice(0, 255),
        altText: extra.altText,
      },
    });
  }
}
