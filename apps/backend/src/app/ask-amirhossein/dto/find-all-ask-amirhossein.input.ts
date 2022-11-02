import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class FindAllAskAmirhosseinInput {
  @Field(() => String)
  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
