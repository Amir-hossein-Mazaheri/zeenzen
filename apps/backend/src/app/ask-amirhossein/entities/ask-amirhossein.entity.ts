import { ObjectType, Field, ID } from '@nestjs/graphql';

import { User } from '../../user/entities/user.entity';

@ObjectType()
export class AskAmirhossein {
  @Field(() => ID, { description: 'ask amirhossein id.' })
  id: number;

  @Field(() => String, { description: 'question body.' })
  question: string;

  @Field(() => String, { nullable: true, description: 'answer body.' })
  answer: string;

  @Field(() => String, {
    description:
      'person who asked question email, if user is logged in its not needed.',
  })
  email: string;

  @Field(() => Date, { description: 'creation time of question.' })
  createdAt: Date;

  @Field(() => Date, {
    nullable: true,
    description: 'answer time of question.',
  })
  answeredAt: Date;

  @Field(() => User, {
    description: 'if user is logged in this will be assigned.',
  })
  user: User;
}
