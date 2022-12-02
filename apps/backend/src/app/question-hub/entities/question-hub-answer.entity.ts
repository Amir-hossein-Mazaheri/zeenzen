import { Field, Int, ObjectType } from '@nestjs/graphql';

import { User } from '../../user/entities/user.entity';
import { QuestionHubQuestion } from './question-hub-question.entity';

@ObjectType()
export class QuestionHubAnswer {
  @Field(() => Int, { description: 'question hub answer id.' })
  id: number;

  @Field(() => String, { description: 'question hub answer body.' })
  answer: string;

  @Field(() => Date, { description: 'creation date of question hub answer.' })
  createdAt: Date;

  @Field(() => QuestionHubQuestion, {
    description: 'question hub answer, question parent.',
  })
  question: QuestionHubQuestion;

  @Field(() => User, { description: 'who answered the question user.' })
  whoAnswered: User;
}
