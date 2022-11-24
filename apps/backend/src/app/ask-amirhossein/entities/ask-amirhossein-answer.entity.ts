import { Field, ID, ObjectType } from '@nestjs/graphql';

import { User } from '../../user/entities/user.entity';
import { AskAmirhossein } from './ask-amirhossein.entity';

@ObjectType()
export class AskAmirhosseinAnswer {
  @Field(() => ID, { description: 'answer id.' })
  id: number;

  @Field(() => String, { description: 'answer body.' })
  answer: string;

  @Field(() => Date, { description: 'time of creation.' })
  createdAt: Date;

  @Field(() => Boolean, {
    description: 'determine whether answer is available to public or not.',
  })
  isPublished: boolean;

  @Field(() => User, { description: 'answer body.' })
  whoAnswered: User;

  @Field(() => AskAmirhossein, { description: 'answer body.' })
  question: AskAmirhossein;

  @Field(() => [User], { description: 'answer body.' })
  likedUsers: User[];
}
