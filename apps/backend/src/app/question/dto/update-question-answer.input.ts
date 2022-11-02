import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateQuestionAnswerInput {
  @Field(() => ID, { description: 'target question id.' })
  @IsNotEmpty()
  id: number;

  @Field(() => String, { description: 'question answer.' })
  @IsNotEmpty()
  answer: string;
}
