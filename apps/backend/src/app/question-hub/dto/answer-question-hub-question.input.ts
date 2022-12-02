import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class AnswerQuestionHubQuestionInput {
  @Field(() => Int, { description: 'parent question hub question.' })
  @IsNotEmpty()
  @IsNumber()
  questionId: number;

  @Field(() => String, { description: 'answer body which supports html.' })
  @IsNotEmpty()
  @IsString()
  answer: string;
}
