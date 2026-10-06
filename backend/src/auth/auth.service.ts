import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { JwtPayload } from '../common/guards/jwt-auth.guard';
import { DUMMY_HASH, hashPassword, verifyPassword } from './password';

export const PUBLIC_ADMIN_FIELDS = {
  id: true,
  email: true,
  name: true,
  role: true,
  isActive: true,
  lastLoginAt: true,
  createdAt: true,
} as const;

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.prisma.adminUser.findUnique({ where: { email } });
    const valid = await verifyPassword(
      password,
      user?.passwordHash ?? DUMMY_HASH,
    );
    if (!user || !valid || !user.isActive) {
      throw new UnauthorizedException('Invalid email or password');
    }

    await this.prisma.adminUser.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    const payload: JwtPayload = {
      sub: user.id,
      role: user.role,
      tv: user.tokenVersion,
    };
    return {
      accessToken: await this.jwt.signAsync(payload),
      tokenType: 'Bearer',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  me(userId: string) {
    return this.prisma.adminUser.findUniqueOrThrow({
      where: { id: userId },
      select: PUBLIC_ADMIN_FIELDS,
    });
  }

  async changePassword(userId: string, current: string, next: string) {
    const user = await this.prisma.adminUser.findUniqueOrThrow({
      where: { id: userId },
    });
    if (!(await verifyPassword(current, user.passwordHash))) {
      throw new BadRequestException('Current password is incorrect');
    }
    // Bumping tokenVersion signs out every existing session.
    await this.prisma.adminUser.update({
      where: { id: userId },
      data: {
        passwordHash: await hashPassword(next),
        tokenVersion: { increment: 1 },
      },
    });
  }
}
