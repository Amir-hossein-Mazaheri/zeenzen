import { createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetInstructorId = createParamDecorator(
  (data: unknown, context: GqlExecutionContext) => {
    const ctx = GqlExecutionContext.create(context).getContext();
    return ctx.req.user.instructorId;
  },
);
