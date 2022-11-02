import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateInstructorInput {
  @Field(() => ID, { description: 'target instructor id.' })
  @IsNotEmpty()
  id: number;

  @Field(() => String, { description: 'a short description about instructor.' })
  @IsNotEmpty()
  about: string;
}
