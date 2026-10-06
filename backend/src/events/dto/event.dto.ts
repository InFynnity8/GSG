import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsIn,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
} from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination.dto';
import {
  IsDateOnly,
  IsHttpUrl,
  IsMediaUrl,
  IsTimeOfDay,
  ToBoolean,
  Trim,
  TrimToNull,
} from '../../common/validators';

export class CreateEventDto {
  @ApiProperty() @Trim() @IsString() @MaxLength(200) title!: string;

  @ApiPropertyOptional({ description: 'Generated from title when omitted' })
  @IsOptional()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  @MaxLength(100)
  slug?: string;

  @ApiProperty({ example: 'Prayer' })
  @Trim()
  @IsString()
  @MaxLength(60)
  type!: string;
  @ApiProperty() @Trim() @IsString() @MaxLength(10000) description!: string;
  @ApiProperty({ example: '2026-10-15' }) @IsDateOnly() date!: string;
  @ApiPropertyOptional({ example: '18:30' })
  @IsOptional()
  @IsTimeOfDay()
  time?: string | null;
  @ApiPropertyOptional({ example: '2026-10-17' })
  @IsOptional()
  @IsDateOnly()
  endDate?: string | null;
  @ApiPropertyOptional({ example: '21:00' })
  @IsOptional()
  @IsTimeOfDay()
  endTime?: string | null;
  @ApiProperty() @Trim() @IsString() @MaxLength(200) venue!: string;
  @ApiPropertyOptional() @IsOptional() @IsMediaUrl() image?: string | null;
  @ApiPropertyOptional()
  @IsOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(300)
  imageKey?: string | null;
  @ApiPropertyOptional() @IsOptional() @IsHttpUrl() registrationUrl?:
    string | null;
  @ApiPropertyOptional() @IsOptional() @IsHttpUrl() livestreamUrl?:
    string | null;
  @ApiPropertyOptional() @IsOptional() @IsUUID() branchId?: string | null;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isFeatured?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isPublished?: boolean;
}

export class UpdateEventDto extends PartialType(CreateEventDto) {}

export class EventQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ description: 'Only events from today onward' })
  @IsOptional()
  @ToBoolean()
  @IsBoolean()
  upcoming?: boolean;

  @ApiPropertyOptional({ description: 'Only events before today' })
  @IsOptional()
  @ToBoolean()
  @IsBoolean()
  past?: boolean;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(60) type?: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() branchId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @ToBoolean()
  @IsBoolean()
  featured?: boolean;

  @ApiPropertyOptional({ enum: ['asc', 'desc'], default: 'asc' })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  order: 'asc' | 'desc' = 'asc';
}
