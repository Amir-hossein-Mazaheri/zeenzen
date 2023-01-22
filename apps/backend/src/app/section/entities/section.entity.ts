import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

import { Course } from '../../course/entities/course.entity';
import { Lecture } from '../../lecture/entities/lecture.entity';

@ObjectType()
export class Section {
  @Field(() => ID, { description: 'section.' })
  id: number;

  @Field(() => String, { description: 'section label/title.' })
  label: string;

  @Field(() => Int, { description: 'total section duration.' })
  duration?: number;

  @Field(() => String, { description: 'section description in markup.' })
  description: string;

  @Field(() => Date, { description: 'section creation date.' })
  createdAt: Date;

  @Field(() => Date, { description: 'section update date.' })
  updatedAt: Date;

  deletedAt: Date;

  @Field(() => Course, {
    nullable: true,
    description: 'parent course of section.',
  })
  course: Course;

  @Field(() => Lecture, {
    nullable: true,
    description: 'section related lectures.',
  })
  lectures: Lecture[];
}
