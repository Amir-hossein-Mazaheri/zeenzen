import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateInstructorInput {
  @Field(() => Int, { description: 'target instructor id.' })
  @IsNotEmpty()
  id: number;

  @Field(() => String, { description: 'a short description about instructor.' })
  @IsNotEmpty()
  about: string;
}
