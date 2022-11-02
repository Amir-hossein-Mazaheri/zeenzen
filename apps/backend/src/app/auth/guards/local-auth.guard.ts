import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

// this guard checks user email and passport and also adds a session
export class LocalAuthGuard extends AuthGuard('local') {
  constructor() {
    super();
  }

  // extra step for GraphQL
  // passport is designed for REST api but with this method we convert our Graphql context
  // into something that passport understands
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext();
    request.body = ctx.getArgs().signInInput;
    return request;
  }

  // by default local strategy adds user into context not into request
  // but passport expect it to be on request so we should add it into request object
  async canActivate(context: ExecutionContext) {
    const result = (await super.canActivate(context)) as boolean;

    const ctx = GqlExecutionContext.create(context).getContext();
    const request = ctx.req;
    request.user = ctx.user;

    await super.logIn(request);

    return result;
  }
}
