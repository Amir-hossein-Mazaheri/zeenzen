import { createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { UserRole } from '../../types';

export const GetUserRole = createParamDecorator(
  (data: unknown, context: GqlExecutionContext): UserRole => {
    const ctx = GqlExecutionContext.create(context).getContext();
    return ctx?.user?.role || ctx.req?.user?.role;
  }
);
