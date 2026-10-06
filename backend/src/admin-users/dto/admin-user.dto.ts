import {
  ApiProperty,
  ApiPropertyOptional,
  PartialType,
  OmitType,
} from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { AdminRole } from '../../generated/prisma/enums';
import { LowerTrim, Trim } from '../../common/validators';

export class CreateAdminUserDto {
  @ApiProperty()
  @LowerTrim()
  @IsEmail()
  @MaxLength(254)
  email!: string;

  @ApiProperty()
  @Trim()
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  name!: string;

  @ApiProperty({ minLength: 10 })
  @IsString()
  @MinLength(10)
  @MaxLength(128)
  password!: string;

  @ApiPropertyOptional({ enum: AdminRole, default: AdminRole.EDITOR })
  @IsOptional()
  @IsEnum(AdminRole)
  role?: AdminRole;
}

export class UpdateAdminUserDto extends PartialType(
  OmitType(CreateAdminUserDto, ['email'] as const),
) {
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
