import { Field, InputType, PickType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, Matches } from 'class-validator';

import { getPasswordRegex } from '../../utils/getPasswordRegex';
import { UpdateUserInput } from './update-user.input';

@InputType()
export class LimitedUpdateUserInput extends PickType(UpdateUserInput, [
  'email',
  'firstname',
  'lastname',
  'phoneNumber',
]) {
  @Field(() => String)
  @IsNotEmpty()
  password: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsNotEmpty()
  @Matches(getPasswordRegex())
  newPassword: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsNotEmpty()
  repeatNewPassword: string;
}
