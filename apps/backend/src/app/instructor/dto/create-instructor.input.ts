import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateInstructorInput {
  @Field(() => String, { description: 'a short description about instructor.' })
  @IsNotEmpty()
  about: string;

  @Field(() => Int, {
    description: 'the user that want to be promoted into instructor.',
  })
  @IsNotEmpty()
  userId: number;
}
