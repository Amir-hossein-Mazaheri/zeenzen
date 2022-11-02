import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class FindOneAskAmirhosseinInput {
  @Field(() => ID)
  @IsNotEmpty()
  id: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  email?: string;
}
