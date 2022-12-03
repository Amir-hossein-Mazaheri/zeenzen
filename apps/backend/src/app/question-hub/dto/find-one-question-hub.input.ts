import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class FindOneQuestionHubInput {
  @Field(() => Int, { description: 'target question hub.' })
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
