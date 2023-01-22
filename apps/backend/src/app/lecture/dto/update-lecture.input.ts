import { InputType, Field, PartialType, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

import { CreateLectureInput } from './create-lecture.input';

@InputType()
export class UpdateLectureInput extends PartialType(CreateLectureInput) {
  @Field(() => Int)
  @IsNotEmpty()
  id: number;
}
