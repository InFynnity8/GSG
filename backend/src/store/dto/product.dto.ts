import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination.dto';
import { IsMediaUrl, Trim, TrimToNull } from '../../common/validators';

class BaseProductDto {
  @ApiProperty() @Trim() @IsString() @MaxLength(200) title!: string;

  @ApiPropertyOptional({ description: 'Generated from title when omitted' })
  @IsOptional()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  @MaxLength(100)
  slug?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(5000)
  description?: string | null;

  @ApiProperty({ example: 50 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(1_000_000)
  price!: number;

  @ApiPropertyOptional({ default: 'GHS' })
  @IsOptional()
  @Matches(/^[A-Z]{3}$/)
  currency?: string;

  @ApiProperty() @IsMediaUrl() image!: string;
  @ApiPropertyOptional()
  @IsOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(300)
  imageKey?: string | null;

  @ApiPropertyOptional({ description: 'Leave empty to not track stock' })
  @IsOptional()
  @IsInt()
  @Min(0)
  stock?: number | null;

  @ApiPropertyOptional() @IsOptional() @IsBoolean() isPublished?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0) sortOrder?: number;
}

export class CreateBookDto extends BaseProductDto {
  @ApiProperty() @Trim() @IsString() @MaxLength(160) author!: string;
  @ApiPropertyOptional()
  @IsOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(60)
  category?: string | null;
}
export class UpdateBookDto extends PartialType(CreateBookDto) {}

export class CreateMerchandiseDto extends BaseProductDto {
  @ApiProperty() @Trim() @IsString() @MaxLength(60) category!: string;

  @ApiPropertyOptional({ type: [String], example: ['S', 'M', 'L'] })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(20)
  @IsString({ each: true })
  @MaxLength(20, { each: true })
  sizes?: string[];
}
export class UpdateMerchandiseDto extends PartialType(CreateMerchandiseDto) {}

export class ProductQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(60)
  category?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxPrice?: number;

  @ApiPropertyOptional({
    enum: ['newest', 'price-asc', 'price-desc', 'title'],
    default: 'newest',
  })
  @IsOptional()
  @IsIn(['newest', 'price-asc', 'price-desc', 'title'])
  sort: 'newest' | 'price-asc' | 'price-desc' | 'title' = 'newest';
}
