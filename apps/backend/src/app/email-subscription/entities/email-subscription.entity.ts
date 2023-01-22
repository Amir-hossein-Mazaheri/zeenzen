import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EmailSubscription {
  @Field(() => Int, { description: 'subscription id.' })
  id: number;

  @Field(() => String, { description: 'subscription email.' })
  email: string;

  @Field(() => Date, {
    description: 'time of start subscription.',
  })
  subscriptedAt: Date;
}
