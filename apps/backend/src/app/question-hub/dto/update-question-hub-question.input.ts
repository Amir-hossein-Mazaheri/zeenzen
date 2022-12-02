import { Field, InputType, Int, PickType } from '@nestjs/graphql';

import { CreateQuestionHubQuestionInput } from './create-question-hub-question.input';

@InputType()
export class UpdateQuestionHubQuestionInput extends PickType(
  CreateQuestionHubQuestionInput,
  ['title', 'description']
) {
  @Field(() => Int, { description: 'target question hub question id.' })
  id: number;
}
