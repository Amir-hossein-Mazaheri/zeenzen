import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateQuestionInput {
  @Field(() => String, { description: 'actual question.' })
  @IsNotEmpty()
  question: string;
}
