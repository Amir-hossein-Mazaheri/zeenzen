import { createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetUser = createParamDecorator(
  (data: unknown, context: GqlExecutionContext) => {
    const ctx = GqlExecutionContext.create(context).getContext();
    return ctx.user || ctx.req.user;
  },
);
