import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class FindOneQuestionHubInput {
  @Field(() => String, { description: 'target question hub.' })
  @IsNotEmpty()
  @IsString()
  id: string;
}
