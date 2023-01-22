import { InputType, Field, PartialType, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

import { CreateQuestionInput } from './create-question.input';

@InputType()
export class UpdateQuestionInput extends PartialType(CreateQuestionInput) {
  @Field(() => Int, { description: 'target question id.' })
  @IsNotEmpty()
  id: number;
}
