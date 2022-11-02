import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class AnswerAskAmirhosseinInput {
  @Field(() => ID, { description: 'question that is being answered.' })
  @IsNotEmpty()
  id: number;

  @Field(() => String, {
    description: 'answer to the question which is sent via email.',
  })
  @IsNotEmpty()
  answer: string;
}
