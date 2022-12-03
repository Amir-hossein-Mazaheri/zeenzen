import { Field, Int, ObjectType } from '@nestjs/graphql';

import { User } from '../../user/entities/user.entity';
import { QuestionHubAnswer } from './question-hub-answer.entity';
import { QuestionHub } from './question-hub.entity';

@ObjectType()
export class QuestionHubQuestion {
  @Field(() => Int, { description: "question hub's question id." })
  id: number;

  @Field(() => String, { description: 'question who asked full name.' })
  fullName: string;

  @Field(() => String, { description: 'question title.' })
  title: string;

  @Field(() => String, { description: 'question description and details.' })
  description: string;

  @Field(() => Date, { description: 'creation date of question hub question.' })
  createdAt: Date;

  @Field(() => QuestionHub)
  hub: QuestionHub;

  @Field(() => User, { description: 'who asked the question.' })
  whoAsked: User;

  @Field(() => [QuestionHubAnswer], {
    description: 'question hub answers related to this question.',
  })
  answers: QuestionHubAnswer[];
}
