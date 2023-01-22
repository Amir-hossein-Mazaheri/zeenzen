import { Field, Int, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class FindAllSectionInput {
  @Field(() => Int, {
    description: 'target course id which sections are needed.',
  })
  @IsNotEmpty()
  courseId: number;
}
