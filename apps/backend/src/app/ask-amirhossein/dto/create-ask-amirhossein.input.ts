import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, Max } from 'class-validator';

@InputType()
export class CreateAskAmirhosseinInput {
  @Field(() => String, {
    description: 'create ask amirhossein question title.',
  })
  @IsNotEmpty()
  @IsString()
  @Max(255)
  title: string;

  @Field(() => String, {
    description: 'create ask amirhossein question description.',
  })
  @IsNotEmpty()
  @IsString()
  @Max(1000)
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
