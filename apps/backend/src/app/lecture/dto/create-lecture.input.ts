import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsPositive } from 'class-validator';

@InputType()
export class CreateLectureInput {
  @Field(() => String, { description: 'lecture label/title.' })
  @IsNotEmpty()
  label: string;

  @Field(() => Int, {
    nullable: true,
    description: 'total duration of lecture.',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsPositive()
  duration?: number;

  @Field(() => Int, {
    description: 'section id that lecture gonna belongs to.',
  })
  @IsNotEmpty()
  sectionId: number;
}
