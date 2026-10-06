import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { AdminRole } from '../../generated/prisma/enums';

export const IS_PUBLIC_KEY = 'isPublic';
/** Opt a route out of the global JWT guard. Every route is private by default. */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const ROLES_KEY = 'roles';
/** Restrict a route to the given roles. SUPER_ADMIN always passes. */
export const Roles = (...roles: AdminRole[]) => SetMetadata(ROLES_KEY, roles);

/** Role sets used across admin controllers */
export const CONTENT_ROLES: AdminRole[] = ['SUPER_ADMIN', 'ADMIN', 'EDITOR'];
export const STAFF_ROLES: AdminRole[] = ['SUPER_ADMIN', 'ADMIN'];

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AuthUser =>
    ctx.switchToHttp().getRequest<{ user: AuthUser }>().user,
);
