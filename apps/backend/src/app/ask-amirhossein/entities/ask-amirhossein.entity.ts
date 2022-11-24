import { ObjectType, Field, ID } from '@nestjs/graphql';

import { User } from '../../user/entities/user.entity';
import { AskAmirhosseinAnswer } from './ask-amirhossein-answer.entity';

@ObjectType()
export class AskAmirhossein {
  @Field(() => ID, { description: 'ask amirhossein id.' })
  id: number;

  @Field(() => String, { description: 'full name of who asked.' })
  fullName: string;

  @Field(() => String, { description: 'question body.' })
  question: string;

  @Field(() => Boolean, {
    description: 'determine ask amirhossein is available to public or not.',
  })
  isPublished: boolean;

  // @Field(() => String, {
  //   description:
  //     'person who asked question email, if user is logged in its not needed.',
  // })
  email: string;

  @Field(() => Date, { description: 'creation time of question.' })
  createdAt: Date;

  @Field(() => Date, {
    nullable: true,
    description: 'answer time of question.',
  })
  answeredAt?: Date;

  @Field(() => User, {
    nullable: true,
    description: 'if user is logged in this will be assigned.',
  })
  whoAsked: User;

  @Field(() => [AskAmirhosseinAnswer], {
    nullable: true,
    description: 'ask amirhossein answers.',
  })
  answers: AskAmirhosseinAnswer;
}
