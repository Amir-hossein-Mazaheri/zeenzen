import { Field, Int, ObjectType } from '@nestjs/graphql';

import { User } from '../../user/entities/user.entity';
import { AskAmirhossein } from './ask-amirhossein.entity';

@ObjectType()
export class AskAmirhosseinAnswer {
  @Field(() => Int, { description: 'answer id.' })
  id: number;

  // added this field because firstname and lastname are optional in user model
  @Field(() => String, { description: 'full name of who answered.' })
  fullName: string;

  @Field(() => String, { description: 'answer body.' })
  answer: string;

  @Field(() => Date, { description: 'time of creation.' })
  createdAt: Date;

  @Field(() => Int, { description: 'total amount of likes.' })
  likesCount: number;

  @Field(() => Boolean, {
    description: 'determine whether answer is available to public or not.',
  })
  isPublished: boolean;

  @Field(() => User, { description: 'answer body.' })
  whoAnswered: User;

  @Field(() => AskAmirhossein, { description: 'answer body.' })
  question: AskAmirhossein;
}
