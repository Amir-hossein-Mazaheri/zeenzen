import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class FindOneAskAmirhosseinInput {
  @Field(() => Int)
  @IsNotEmpty()
  id: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  email?: string;
}
