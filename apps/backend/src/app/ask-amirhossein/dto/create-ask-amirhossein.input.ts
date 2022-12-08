import { InputType, Field } from '@nestjs/graphql';
import { IsByteLength, IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateAskAmirhosseinInput {
  @Field(() => String, {
    description: 'create ask amirhossein question title.',
  })
  @IsNotEmpty()
  @IsByteLength(1, 255)
  title: string;

  @Field(() => String, {
    description: 'create ask amirhossein question description.',
  })
  @IsNotEmpty()
  @IsByteLength(1, 1000)
  description: string;

  @Field(() => String, {
    description: 'create ask amirhossein email.',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field(() => String, {
    description: 'create ask amirhossein full name.',
  })
  @IsNotEmpty()
  fullName: string;
}
