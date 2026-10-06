import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PUBLIC_ADMIN_FIELDS } from '../auth/auth.service';
import { hashPassword } from '../auth/password';
import { CurrentUser, Roles } from '../common/decorators/auth.decorators';
import type { AuthUser } from '../common/decorators/auth.decorators';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAdminUserDto, UpdateAdminUserDto } from './dto/admin-user.dto';

@ApiTags('Admin · Users')
@ApiBearerAuth()
@Roles('SUPER_ADMIN')
@Controller('admin/users')
export class AdminUsersController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  findAll() {
    return this.prisma.adminUser.findMany({
      select: PUBLIC_ADMIN_FIELDS,
      orderBy: { createdAt: 'asc' },
    });
  }

  @Post()
  async create(@Body() dto: CreateAdminUserDto) {
    const { password, ...rest } = dto;
    return this.prisma.adminUser.create({
      data: { ...rest, passwordHash: await hashPassword(password) },
      select: PUBLIC_ADMIN_FIELDS,
    });
  }

  @Patch(':id')
  async update(
    @CurrentUser() me: AuthUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateAdminUserDto,
  ) {
    if (id === me.id && (dto.isActive === false || dto.role)) {
      throw new BadRequestException(
        'You cannot deactivate yourself or change your own role',
      );
    }
    const { password, ...rest } = dto;
    const revokeSessions =
      password !== undefined || dto.isActive === false || dto.role;
    return this.prisma.adminUser.update({
      where: { id },
      data: {
        ...rest,
        ...(password ? { passwordHash: await hashPassword(password) } : {}),
        ...(revokeSessions ? { tokenVersion: { increment: 1 } } : {}),
      },
      select: PUBLIC_ADMIN_FIELDS,
    });
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(
    @CurrentUser() me: AuthUser,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    if (id === me.id) {
      throw new BadRequestException('You cannot delete your own account');
    }
    await this.prisma.adminUser.delete({ where: { id } });
  }
}
