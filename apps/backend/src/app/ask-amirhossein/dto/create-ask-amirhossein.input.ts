import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateAskAmirhosseinInput {
  @Field(() => String, { description: 'Example field (placeholder)' })
  @IsNotEmpty()
  question: string;

  @Field(() => String, {
    nullable: true,
    description: 'Example field (placeholder)',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  email?: string;
}
