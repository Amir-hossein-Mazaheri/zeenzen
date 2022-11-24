import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateAskAmirhosseinInput {
  @Field(() => String, { description: 'create ask amirhossein question body.' })
  @IsNotEmpty()
  question: string;

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
