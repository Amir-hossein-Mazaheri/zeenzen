import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class FindOneQuestionHubInput {
  @Field(() => String, { description: 'target question hub.' })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
