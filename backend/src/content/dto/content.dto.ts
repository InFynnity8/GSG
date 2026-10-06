import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsInt,
  IsLatitude,
  IsLongitude,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import {
  DayOfWeek,
  GivingMethodType,
  LeaderGroup,
  MediaType,
  PageSectionType,
} from '../../generated/prisma/enums';
import {
  IsHref,
  IsHttpUrl,
  IsMediaUrl,
  IsTimeOfDay,
  Trim,
  TrimToNull,
} from '../../common/validators';

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Fields every sortable/publishable content row accepts. */
class Orderable {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  sortOrder?: number;
}

// ── Social links ────────────────────────────────────────────────────────────
export class CreateSocialLinkDto extends Orderable {
  @ApiProperty({ example: 'youtube' })
  @Trim()
  @IsString()
  @MaxLength(40)
  platform!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(80)
  label?: string | null;

  @ApiProperty()
  @IsHttpUrl()
  url!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
export class UpdateSocialLinkDto extends PartialType(CreateSocialLinkDto) {}

// ── Stats ───────────────────────────────────────────────────────────────────
export class CreateSiteStatDto extends Orderable {
  @ApiProperty({ example: 'Branches' })
  @Trim()
  @IsString()
  @MaxLength(60)
  label!: string;

  @ApiProperty({ example: '8+' })
  @Trim()
  @IsString()
  @MaxLength(20)
  value!: string;

  @ApiPropertyOptional() @IsOptional() @IsBoolean() showOnHome?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() showOnGive?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isActive?: boolean;
}
export class UpdateSiteStatDto extends PartialType(CreateSiteStatDto) {}

// ── Hero slides ─────────────────────────────────────────────────────────────
export class CreateHeroSlideDto extends Orderable {
  @ApiPropertyOptional({ enum: MediaType })
  @IsOptional()
  @IsEnum(MediaType)
  mediaType?: MediaType;

  @ApiProperty() @IsMediaUrl() mediaUrl!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(300)
  mediaKey?: string | null;

  @ApiPropertyOptional() @IsOptional() @IsMediaUrl() posterUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(160)
  title?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(400)
  subtitle?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(40)
  primaryCtaLabel?: string | null;

  @ApiPropertyOptional() @IsOptional() @IsHref() primaryCtaHref?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(40)
  secondaryCtaLabel?: string | null;

  @ApiPropertyOptional() @IsOptional() @IsHref() secondaryCtaHref?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isActive?: boolean;
}
export class UpdateHeroSlideDto extends PartialType(CreateHeroSlideDto) {}

// ── Page sections (history / mission / core values) ─────────────────────────
export class CreatePageSectionDto extends Orderable {
  @ApiProperty({ enum: PageSectionType })
  @IsEnum(PageSectionType)
  type!: PageSectionType;

  @ApiProperty()
  @Trim()
  @IsString()
  @MinLength(1)
  @MaxLength(160)
  title!: string;

  @ApiProperty() @Trim() @IsString() @MaxLength(5000) body!: string;

  @ApiPropertyOptional({ example: 'BookOpen' })
  @IsOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(60)
  icon?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(60)
  color?: string | null;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(50)
  @IsString({ each: true })
  @MaxLength(500, { each: true })
  listItems?: string[];

  @ApiPropertyOptional() @IsOptional() @IsBoolean() isPublished?: boolean;
}
export class UpdatePageSectionDto extends PartialType(CreatePageSectionDto) {}

// ── Branches ────────────────────────────────────────────────────────────────
export class CreateBranchDto extends Orderable {
  @ApiProperty({ example: 'Zion' })
  @Trim()
  @IsString()
  @MaxLength(120)
  name!: string;

  @ApiPropertyOptional({ description: 'Generated from name when omitted' })
  @IsOptional()
  @Matches(SLUG)
  @MaxLength(80)
  slug?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(160)
  fullName?: string | null;
  @ApiProperty() @Trim() @IsString() @MaxLength(160) location!: string;
  @ApiPropertyOptional()
  @IsOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(300)
  address?: string | null;
  @ApiPropertyOptional()
  @IsOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(3000)
  description?: string | null;
  @ApiPropertyOptional()
  @IsOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(40)
  phone?: string | null;
  @ApiPropertyOptional() @IsOptional() @IsEmail() email?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(120)
  pastorName?: string | null;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isHeadquarters?: boolean;
  @ApiPropertyOptional()
  @IsOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(60)
  accent?: string | null;
  @ApiPropertyOptional() @IsOptional() @IsHttpUrl() mapUrl?: string;
  @ApiPropertyOptional() @IsOptional() @IsLatitude() latitude?: number;
  @ApiPropertyOptional() @IsOptional() @IsLongitude() longitude?: number;
  @ApiPropertyOptional() @IsOptional() @IsMediaUrl() imageUrl?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(300)
  imageKey?: string | null;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() showOnContact?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isPublished?: boolean;
}
export class UpdateBranchDto extends PartialType(CreateBranchDto) {}

// ── Service times ───────────────────────────────────────────────────────────
export class CreateServiceTimeDto extends Orderable {
  @ApiPropertyOptional({ description: 'Leave empty for church-wide/online' })
  @IsOptional()
  @IsUUID()
  branchId?: string;

  @ApiProperty({ example: 'Sunday Worship' })
  @Trim()
  @IsString()
  @MaxLength(120)
  name!: string;

  @ApiProperty({ enum: DayOfWeek }) @IsEnum(DayOfWeek) day!: DayOfWeek;
  @ApiProperty({ example: '09:00' }) @IsTimeOfDay() startTime!: string;
  @ApiPropertyOptional({ example: '12:00' })
  @IsOptional()
  @IsTimeOfDay()
  endTime?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(500)
  description?: string | null;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isOnline?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isActive?: boolean;
}
export class UpdateServiceTimeDto extends PartialType(CreateServiceTimeDto) {}

// ── Leaders ─────────────────────────────────────────────────────────────────
export class CreateLeaderDto extends Orderable {
  @ApiPropertyOptional({ enum: LeaderGroup })
  @IsOptional()
  @IsEnum(LeaderGroup)
  group?: LeaderGroup;

  @ApiProperty() @Trim() @IsString() @MaxLength(120) name!: string;
  @ApiPropertyOptional()
  @IsOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(120)
  role?: string | null;
  @ApiPropertyOptional()
  @IsOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(60)
  title?: string | null;
  @ApiPropertyOptional()
  @IsOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(5000)
  bio?: string | null;
  @ApiPropertyOptional()
  @IsOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(40)
  phone?: string | null;
  @ApiPropertyOptional() @IsOptional() @IsEmail() email?: string;
  @ApiPropertyOptional() @IsOptional() @IsMediaUrl() imageUrl?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(300)
  imageKey?: string | null;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isPublished?: boolean;
}
export class UpdateLeaderDto extends PartialType(CreateLeaderDto) {}

// ── Departments ─────────────────────────────────────────────────────────────
export class CreateDepartmentDto extends Orderable {
  @ApiProperty() @Trim() @IsString() @MaxLength(120) name!: string;

  @ApiPropertyOptional({ description: 'Generated from name when omitted' })
  @IsOptional()
  @Matches(SLUG)
  @MaxLength(80)
  slug?: string;

  @ApiPropertyOptional({ example: 'Music' })
  @IsOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(60)
  icon?: string | null;
  @ApiProperty() @Trim() @IsString() @MaxLength(3000) description!: string;
  @ApiPropertyOptional()
  @IsOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(1000)
  activity?: string | null;
  @ApiPropertyOptional()
  @IsOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(120)
  leadName?: string | null;
  @ApiPropertyOptional() @IsOptional() @IsMediaUrl() imageUrl?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(300)
  imageKey?: string | null;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isPublished?: boolean;
}
export class UpdateDepartmentDto extends PartialType(CreateDepartmentDto) {}

// ── Giving methods ──────────────────────────────────────────────────────────
export class CreateGivingMethodDto extends Orderable {
  @ApiProperty({ enum: GivingMethodType })
  @IsEnum(GivingMethodType)
  type!: GivingMethodType;

  @ApiProperty({ example: 'MTN MoMo' })
  @Trim()
  @IsString()
  @MaxLength(80)
  provider!: string;
  @ApiPropertyOptional()
  @IsOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(120)
  accountName?: string | null;
  @ApiPropertyOptional()
  @IsOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(60)
  accountNumber?: string | null;
  @ApiPropertyOptional()
  @IsOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(120)
  bankBranch?: string | null;
  @ApiPropertyOptional()
  @IsOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(20)
  swiftCode?: string | null;
  @ApiPropertyOptional()
  @IsOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(1000)
  instructions?: string | null;
  @ApiPropertyOptional() @IsOptional() @IsMediaUrl() qrImageUrl?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(300)
  qrImageKey?: string | null;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isActive?: boolean;
}
export class UpdateGivingMethodDto extends PartialType(CreateGivingMethodDto) {}
