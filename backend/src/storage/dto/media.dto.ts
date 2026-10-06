import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationQueryDto } from '../../common/dto/pagination.dto';
import {
  ALLOWED_MIME_TYPES,
  MEDIA_FOLDERS,
  type MediaFolder,
} from '../storage.service';

export class UploadMediaDto {
  @ApiPropertyOptional({ enum: MEDIA_FOLDERS, default: 'misc' })
  @IsOptional()
  @IsIn(MEDIA_FOLDERS)
  folder: MediaFolder = 'misc';

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(300)
  altText?: string;
}

export class PresignUploadDto extends UploadMediaDto {
  @ApiProperty({ enum: Object.keys(ALLOWED_MIME_TYPES) })
  @IsIn(Object.keys(ALLOWED_MIME_TYPES))
  contentType!: string;

  @ApiProperty({ description: 'File size in bytes' })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  size!: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  fileName?: string;
}

export class ConfirmUploadDto {
  @ApiProperty({ description: 'The key returned by /presign' })
  @IsString()
  @Matches(/^[a-z]+\/\d{4}\/\d{2}\/[0-9a-f-]{36}\.[a-z0-9]+$/, {
    message: 'Invalid object key',
  })
  key!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  fileName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(300)
  altText?: string;
}

export class MediaQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ enum: MEDIA_FOLDERS })
  @IsOptional()
  @IsIn(MEDIA_FOLDERS)
  folder?: MediaFolder;
}
