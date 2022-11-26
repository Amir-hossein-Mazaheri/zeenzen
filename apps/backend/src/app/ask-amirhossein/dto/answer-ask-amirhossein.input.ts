import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class AnswerAskAmirhosseinInput {
  @Field(() => Int, { description: 'question that is being answered.' })
  @IsNotEmpty()
  id: number;

  @Field(() => String, {
    description: 'answer to the question which is sent via email.',
  })
  @IsNotEmpty()
  answer: string;
}
