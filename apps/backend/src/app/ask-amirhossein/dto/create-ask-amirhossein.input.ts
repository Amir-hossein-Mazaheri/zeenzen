import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateAskAmirhosseinInput {
  @Field(() => String, { description: 'Example field (placeholder)' })
  @IsNotEmpty()
  question: string;

  @Field(() => String, {
    description: 'Example field (placeholder)',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
