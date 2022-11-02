import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class SignInInput {
  @Field(() => String, { description: 'an email to login.' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field(() => String, { description: 'at least 8 character password.' })
  @IsNotEmpty()
  password: string;
}
