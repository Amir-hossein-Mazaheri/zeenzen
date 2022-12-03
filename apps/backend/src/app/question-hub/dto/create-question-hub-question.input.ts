import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateQuestionHubQuestionInput {
  @Field(() => String, { description: 'parent hub id which is uuid.' })
  @IsNotEmpty()
  @IsUUID()
  hubId: string;

  @Field(() => String, { description: 'title of the question.' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field(() => String, { description: 'description/details of question.' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @Field(() => String, { description: 'full name of who is asking question.' })
  @IsNotEmpty()
  @IsString()
  fullName: string;
}
