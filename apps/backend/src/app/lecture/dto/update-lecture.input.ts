import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

import { CreateLectureInput } from './create-lecture.input';

@InputType()
export class UpdateLectureInput extends PartialType(CreateLectureInput) {
  @Field(() => ID)
  @IsNotEmpty()
  id: number;
}
