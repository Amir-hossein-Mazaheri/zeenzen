import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateInstructorInput {
  @Field(() => String, { description: 'a short description about instructor.' })
  @IsNotEmpty()
  about: string;

  @Field(() => ID, {
    description: 'the user that want to be promoted into instructor.',
  })
  @IsNotEmpty()
  userId: number;
}
