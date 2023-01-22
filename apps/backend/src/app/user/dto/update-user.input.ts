import { Field, Int, InputType } from '@nestjs/graphql';
import {
  IsAlpha,
  IsDecimal,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsPositive,
} from 'class-validator';

import { UserRole } from '../../types';

@InputType()
export class UpdateUserInput {
  @Field(() => Int, { description: 'target user id.' })
  id: number;

  @Field(() => String, { nullable: true, description: 'user firstname.' })
  @IsOptional()
  @IsNotEmpty()
  @IsAlpha('fa-IR')
  firstname?: string;

  @Field(() => String, { nullable: true, description: 'user lastname.' })
  @IsOptional()
  @IsNotEmpty()
  @IsAlpha('fa-IR')
  lastname?: string;

  @Field(() => String, { nullable: true, description: 'user email.' })
  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @Field(() => String, { nullable: true, description: 'user phone number.' })
  @IsOptional()
  @IsNotEmpty()
  @IsPhoneNumber('IR')
  phoneNumber?: string;

  @Field(() => String, { nullable: true, description: 'user scores.' })
  @IsOptional()
  @IsNotEmpty()
  @IsDecimal()
  @IsPositive()
  scores: string;

  @Field(() => String, { nullable: true, description: 'user score gain rate.' })
  @IsOptional()
  @IsNotEmpty()
  @IsDecimal()
  @IsPositive()
  scoreGainRate: string;

  @Field(() => UserRole, {
    nullable: true,
    description:
      'user role which is an enum, like CUSTOMER, INSTRUCTOR, ADMIN.',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(UserRole)
  role?: UserRole;
}
