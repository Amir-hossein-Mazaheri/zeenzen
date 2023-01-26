import { Field, InputType, Int } from '@nestjs/graphql';
import { NotificationAction } from '@prisma/client';

@InputType()
export class createNotificationInput {
  @Field(() => String, { description: 'notification message.' })
  message: string;

  @Field(() => NotificationAction, { description: 'notification action type.' })
  action: NotificationAction;

  @Field(() => [Int], {
    description: 'users that notification should be sent to.',
  })
  usersId: number[];
}
