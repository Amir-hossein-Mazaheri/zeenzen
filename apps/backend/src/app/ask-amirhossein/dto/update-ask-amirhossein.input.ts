import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateAskAmirhosseinInput {
  @Field(() => ID)
  @IsNotEmpty()
  id: number;

  @Field(() => String)
  @IsNotEmpty()
  answer: string;
}
