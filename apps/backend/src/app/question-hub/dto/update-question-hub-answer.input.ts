import { Field, Int, ObjectType, PickType } from '@nestjs/graphql';

import { AnswerQuestionHubQuestionInput } from './answer-question-hub-question.input';

@ObjectType()
export class UpdateQuestionHubAnswerInput extends PickType(
  AnswerQuestionHubQuestionInput,
  ['answer']
) {
  @Field(() => Int, { description: 'target question hub answer id.' })
  id: number;
}
