import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class FindAllSectionInput {
  @Field(() => ID, {
    description: 'target course id which sections are needed.',
  })
  @IsNotEmpty()
  courseId: number;
}
