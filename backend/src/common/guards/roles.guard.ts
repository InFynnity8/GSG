import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AdminRole } from '../../generated/prisma/enums';
import {
  AuthUser,
  IS_PUBLIC_KEY,
  ROLES_KEY,
} from '../decorators/auth.decorators';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const targets = [context.getHandler(), context.getClass()];
    if (this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, targets)) {
      return true;
    }

    const roles = this.reflector.getAllAndOverride<AdminRole[]>(
      ROLES_KEY,
      targets,
    );
    if (!roles?.length) return true; // any authenticated admin

    const user = context.switchToHttp().getRequest<{ user?: AuthUser }>().user;
    if (user && (user.role === 'SUPER_ADMIN' || roles.includes(user.role))) {
      return true;
    }
    throw new ForbiddenException('You do not have access to this resource');
  }
}
