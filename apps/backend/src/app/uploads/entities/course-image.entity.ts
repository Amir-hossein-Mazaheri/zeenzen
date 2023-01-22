import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Course } from '../../course/entities/course.entity';

@ObjectType()
export class CourseImage {
  @Field(() => ID)
  id: string;

  @Field(() => String, {
    description: 'course image, image which is course main image.',
  })
  image: string;

  @Field(() => String, {
    description:
      'course cover image that is only shown in single course pages.',
  })
  coverImage: string;

  @Field(() => Course, { description: 'related course.' })
  course: Course;

  createdAt: Date;
}
