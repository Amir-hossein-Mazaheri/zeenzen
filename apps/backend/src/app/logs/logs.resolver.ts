import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { LogsService } from './logs.service';
import { ErrorLog } from './entities/error-log.entity';
import { UpdateErrorLogComment } from './dto/update-error-log-comment.input';
import { UserLog } from './entities/user-log.entity';
import { UserRole } from '../types';
import { Roles } from '../user/decorators/roles.decorator';

@Roles(UserRole.ADMIN)
@Resolver(() => ErrorLog)
export class LogsResolver {
  constructor(private readonly logsService: LogsService) {}

  @Query(() => [ErrorLog], {
    name: 'errorLogs',
    description: 'returns all error logs.',
  })
  findAllErrorLogs() {
    return this.logsService.findAllErrorLogs();
  }

  @Query(() => ErrorLog, {
    name: 'errorLog',
    description: 'returns a single error log.',
  })
  findOneErrorLog(@Args('id', { type: () => String }) id: string) {
    return this.logsService.findOneErrorLog(id);
  }

  @Query(() => [ErrorLog], {
    name: 'userLogs',
    description: 'returns all users logs.',
  })
  findAllUserLogs() {
    return this.logsService.findAllUserLogs();
  }

  @Query(() => ErrorLog, {
    name: 'userLog',
    description: 'returns a single user log.',
  })
  findOneUserLog(@Args('id', { type: () => String }) id: string) {
    return this.logsService.findOneUserLog(id);
  }

  @Mutation(() => ErrorLog, { description: 'updates an error log comment.' })
  updateErrorLogComment(
    @Args('updateErrorLogComment') updateErrorLogComment: UpdateErrorLogComment
  ) {
    return this.logsService.updateErrorLogComment(updateErrorLogComment);
  }

  @Mutation(() => ErrorLog, { description: 'removes an error log.' })
  removeErrorLog(@Args('id', { type: () => String }) id: string) {
    return this.logsService.removeErrorLog(id);
  }

  @Mutation(() => UserLog, { description: 'removes a user log.' })
  removeUserLog(@Args('id', { type: () => String }) id: string) {
    return this.logsService.removeUserLog(id);
  }
}
