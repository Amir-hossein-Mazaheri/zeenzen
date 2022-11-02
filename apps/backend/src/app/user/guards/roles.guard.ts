import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IS_PUBLIC } from '../../auth/decorators/public.decorator';
import { UserRole } from '../../types';

import { ROLES_KEY } from '../decorators/roles.decorator';
import { CAN_SKIP_ROLES_KEY } from '../decorators/skip-roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  expandRole(role: UserRole) {
    if (role === UserRole.ADMIN) {
      return [UserRole.ADMIN, UserRole.INSTRUCTOR, UserRole.CUSTOMER];
    }

    if (role === UserRole.INSTRUCTOR) {
      return [UserRole.INSTRUCTOR, UserRole.CUSTOMER];
    }

    return [role];
  }

  canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);

    const targets = [ctx.getHandler(), ctx.getClass()];

    const canSkipRoles = this.reflector.getAllAndOverride<boolean>(
      CAN_SKIP_ROLES_KEY,
      targets
    );

    const isPublic = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC,
      targets
    );

    if (isPublic || canSkipRoles) {
      return true;
    }

    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      targets
    );

    if (!requiredRoles) {
      return true;
    }

    const userRoles = this.expandRole(ctx.getContext().req?.user?.role);

    console.log(userRoles);

    return requiredRoles.some((role) => userRoles?.includes(role));
  }
}
