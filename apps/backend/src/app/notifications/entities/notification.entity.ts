import { Field, ObjectType } from '@nestjs/graphql';

import { NotificationAction } from '../../types';
import { User } from '../../user/entities/user.entity';

@ObjectType()
export class NotificationEntity {
  @Field(() => String, { description: 'notification id which is cuid.' })
  id: string;

  @Field(() => String, {
    description: 'the message that notification wants to deliver.',
  })
  message: string;

  @Field(() => NotificationAction, {
    description: 'type of actions that we notify about.',
  })
  action: NotificationAction;

  @Field(() => Date, { description: 'time the notification was created.' })
  createdAt: Date;

  @Field(() => User, { description: 'user that notification was sent to.' })
  user: User;
}
