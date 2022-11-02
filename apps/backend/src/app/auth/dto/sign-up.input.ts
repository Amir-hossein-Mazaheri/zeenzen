import { Field, InputType, PickType } from '@nestjs/graphql';
import { IsNotEmpty, Matches } from 'class-validator';

import { getPasswordRegex } from '../../utils/getPasswordRegex';
import { SignInInput } from './sign-in.input';

@InputType()
export class SignUpInput extends PickType(SignInInput, ['email']) {
  @Field(() => String)
  @IsNotEmpty()
  code: string;

  @Field(() => String, {
    description:
      'at least 8 character, one character, and one number password.',
  })
  @Matches(getPasswordRegex())
  password: string;
}
