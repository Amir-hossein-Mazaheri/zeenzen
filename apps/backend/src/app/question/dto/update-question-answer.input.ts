import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateQuestionAnswerInput {
  @Field(() => Int, { description: 'target question id.' })
  @IsNotEmpty()
  id: number;

  @Field(() => String, { description: 'question answer.' })
  @IsNotEmpty()
  answer: string;
}
