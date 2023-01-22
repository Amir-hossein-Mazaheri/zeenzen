import { Field, ObjectType } from '@nestjs/graphql';

import { UserLogStatus } from '../../types';
import { User } from '../../user/entities/user.entity';

@ObjectType()
export class UserLog {
  @Field(() => String, { description: 'user log id.' })
  id: string;

  @Field(() => UserLogStatus, {
    description: 'determine wether user is logged in or logged out.',
  })
  status: UserLogStatus;

  @Field(() => Date, { description: 'time that log is created.' })
  time: Date;

  deletedAt: Date;

  @Field(() => User, { description: 'user related.' })
  user: User;
}
