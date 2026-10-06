import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination.dto';
import {
  IsMediaUrl,
  LowerTrim,
  Trim,
  TrimToNull,
} from '../../common/validators';
import {
  MessageStatus,
  PrayerRequestStatus,
  SubscriberStatus,
  TestimonyStatus,
} from '../../generated/prisma/enums';

/** Hidden form field. Real users leave it empty; bots fill it in. */
class Honeypot {
  @ApiPropertyOptional({ description: 'Honeypot — leave empty' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  website?: string;
}

// ── Contact ("Write to us") ─────────────────────────────────────────────────
export class CreateContactMessageDto extends Honeypot {
  @ApiProperty()
  @Trim()
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  name!: string;
  @ApiProperty() @LowerTrim() @IsEmail() @MaxLength(254) email!: string;
  @ApiPropertyOptional()
  @IsOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(30)
  phone?: string | null;
  @ApiPropertyOptional()
  @IsOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(200)
  subject?: string | null;
  @ApiProperty()
  @Trim()
  @IsString()
  @MinLength(5)
  @MaxLength(1000)
  message!: string;
}

export class MessageQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ enum: MessageStatus })
  @IsOptional()
  @IsEnum(MessageStatus)
  status?: MessageStatus;
}

export class UpdateMessageStatusDto {
  @ApiProperty({ enum: MessageStatus })
  @IsEnum(MessageStatus)
  status!: MessageStatus;
}

// ── Newsletter ──────────────────────────────────────────────────────────────
export class SubscribeDto extends Honeypot {
  @ApiProperty() @LowerTrim() @IsEmail() @MaxLength(254) email!: string;
  @ApiPropertyOptional()
  @IsOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(120)
  name?: string | null;
}

export class BroadcastDto {
  @ApiProperty()
  @Trim()
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  subject!: string;

  @ApiProperty({ description: 'Email body as HTML (trusted admin input)' })
  @IsString()
  @MinLength(10)
  @MaxLength(200_000)
  html!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Trim()
  @IsString()
  @MaxLength(150)
  previewText?: string;
}

export class UnsubscribeDto {
  @ApiProperty() @IsUUID() token!: string;
}

export class SubscriberQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ enum: SubscriberStatus })
  @IsOptional()
  @IsEnum(SubscriberStatus)
  status?: SubscriberStatus;
}

// ── Prayer requests ─────────────────────────────────────────────────────────
export class CreatePrayerRequestDto extends Honeypot {
  @ApiPropertyOptional()
  @IsOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(120)
  name?: string | null;
  @ApiPropertyOptional()
  @IsOptional()
  @LowerTrim()
  @IsEmail()
  @MaxLength(254)
  email?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(30)
  phone?: string | null;
  @ApiProperty()
  @Trim()
  @IsString()
  @MinLength(5)
  @MaxLength(3000)
  request!: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isAnonymous?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isPrivate?: boolean;
}

export class PrayerQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ enum: PrayerRequestStatus })
  @IsOptional()
  @IsEnum(PrayerRequestStatus)
  status?: PrayerRequestStatus;
}

export class UpdatePrayerStatusDto {
  @ApiProperty({ enum: PrayerRequestStatus })
  @IsEnum(PrayerRequestStatus)
  status!: PrayerRequestStatus;
}

// ── Testimonies ─────────────────────────────────────────────────────────────
export class CreateTestimonyDto extends Honeypot {
  @ApiProperty()
  @Trim()
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  name!: string;
  @ApiPropertyOptional()
  @IsOptional()
  @LowerTrim()
  @IsEmail()
  @MaxLength(254)
  email?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(160)
  title?: string | null;
  @ApiProperty()
  @Trim()
  @IsString()
  @MinLength(10)
  @MaxLength(5000)
  content!: string;
}

export class TestimonyQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ enum: TestimonyStatus })
  @IsOptional()
  @IsEnum(TestimonyStatus)
  status?: TestimonyStatus;
}

export class UpdateTestimonyDto {
  @ApiPropertyOptional({ enum: TestimonyStatus })
  @IsOptional()
  @IsEnum(TestimonyStatus)
  status?: TestimonyStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(160)
  title?: string | null;
  @ApiPropertyOptional()
  @IsOptional()
  @Trim()
  @IsString()
  @MaxLength(5000)
  content?: string;
  @ApiPropertyOptional() @IsOptional() @IsMediaUrl() imageUrl?: string | null;
  @ApiPropertyOptional()
  @IsOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(300)
  imageKey?: string | null;
}
