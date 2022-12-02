import { Field, InputType, Int, PickType } from '@nestjs/graphql';

import { AnswerQuestionHubQuestionInput } from './answer-question-hub-question.input';

@InputType()
export class UpdateQuestionHubAnswerInput extends PickType(
  AnswerQuestionHubQuestionInput,
  ['answer']
) {
  @Field(() => Int, { description: 'target question hub answer id.' })
  id: number;
}
