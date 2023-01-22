import { ObjectType, Field, ID } from '@nestjs/graphql';

import { User } from '../../user/entities/user.entity';

@ObjectType()
export class Report {
  @Field(() => ID, { description: 'report id.' })
  id: number;

  @Field(() => String, { description: 'report title.' })
  title: string;

  @Field(() => String, {
    description:
      'report content which should contain reason and a short description about report.',
  })
  content: string;

  @Field(() => Date, { description: 'time that report been captured.' })
  reportedAt: Date;

  @Field(() => User, {
    description: 'user who reported if the user is logged in.',
  })
  user: User;
}
