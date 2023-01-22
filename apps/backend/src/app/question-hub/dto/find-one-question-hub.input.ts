import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class FindOneQuestionHubInput {
  @Field(() => String, { description: 'target question hub.' })
  @IsNotEmpty()
  @IsString()
  id: string;
}
