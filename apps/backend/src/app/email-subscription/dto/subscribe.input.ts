import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class SubscribeInput {
  @Field(() => String, { description: '' })
  @IsEmail()
  email: string;
}
