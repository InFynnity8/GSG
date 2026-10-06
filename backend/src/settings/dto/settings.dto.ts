import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import {
  IsDateOnly,
  IsHttpUrl,
  IsMediaUrl,
  Trim,
  TrimToNull,
} from '../../common/validators';

export class UpdateSettingsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Trim()
  @IsString()
  @MaxLength(160)
  churchName?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(40)
  shortName?: string | null;
  @ApiPropertyOptional()
  @IsOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(300)
  tagline?: string | null;
  @ApiPropertyOptional()
  @IsOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(2000)
  visionStatement?: string | null;
  @ApiPropertyOptional()
  @IsOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(5000)
  aboutSummary?: string | null;
  @ApiPropertyOptional() @IsOptional() @IsEmail() email?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10)
  @IsString({ each: true })
  @MaxLength(40, { each: true })
  phones?: string[];

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
  @MaxLength(80)
  poBox?: string | null;
  @ApiPropertyOptional()
  @IsOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(80)
  registrationNumber?: string | null;
  @ApiPropertyOptional({ example: '2010-01-01' })
  @IsOptional()
  @IsDateOnly()
  foundedOn?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(120)
  founderName?: string | null;
  @ApiPropertyOptional()
  @IsOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(120)
  nationalCoordinator?: string | null;
  @ApiPropertyOptional() @IsOptional() @IsHttpUrl() liveServiceUrl?: string;
  @ApiPropertyOptional() @IsOptional() @IsHttpUrl() devotionalsUrl?: string;
  @ApiPropertyOptional() @IsOptional() @IsHttpUrl() mapEmbedUrl?: string;
  @ApiPropertyOptional() @IsOptional() @IsEmail() givingContactEmail?: string;
  @ApiPropertyOptional() @IsOptional() @IsMediaUrl() logoUrl?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @TrimToNull()
  @IsString()
  @MaxLength(300)
  logoKey?: string | null;
}
