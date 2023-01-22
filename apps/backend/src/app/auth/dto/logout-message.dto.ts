import { Field, Int, ObjectType } from '@nestjs/graphql';

import { UserRole } from '../../types';

@ObjectType()
export class LogoutMessage {
  constructor(userId: number, userEmail: string, userRole: UserRole) {
    this.userEmail = userEmail;
    this.userId = userId;
    this.userRole = userRole;
  }

  @Field(() => String, { description: 'tells the status of logging out.' })
  message: string;

  @Field(() => Int, { description: 'logged out user id.' })
  userId: number;

  @Field(() => String, { description: 'logged out user email.' })
  userEmail: string;

  @Field(() => UserRole, { description: 'logged out user role.' })
  userRole: UserRole;
}
