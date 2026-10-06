import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination.dto';
import { LowerTrim, Trim, TrimToNull } from '../../common/validators';
import { OrderItemType, OrderStatus } from '../../generated/prisma/enums';

export class CreateOrderDto {
  @ApiProperty({ enum: OrderItemType })
  @IsEnum(OrderItemType)
  itemType!: OrderItemType;

  @ApiProperty() @IsUUID() itemId!: string;

  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(20)
  quantity: number = 1;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(20) size?: string;

  @ApiProperty()
  @Trim()
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  buyerName!: string;

  @ApiProperty()
  @LowerTrim()
  @IsEmail()
  @MaxLength(254)
  buyerEmail!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(30)
  buyerPhone?: string | null;
}

export class OrderQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ enum: OrderStatus })
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @ApiPropertyOptional({ enum: OrderItemType })
  @IsOptional()
  @IsEnum(OrderItemType)
  itemType?: OrderItemType;
}

export class UpdateOrderDto {
  @ApiPropertyOptional({ enum: ['FULFILLED', 'REFUNDED', 'ABANDONED'] })
  @IsOptional()
  @IsIn(['FULFILLED', 'REFUNDED', 'ABANDONED'])
  status?: 'FULFILLED' | 'REFUNDED' | 'ABANDONED';

  @ApiPropertyOptional()
  @IsOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(2000)
  notes?: string | null;
}
