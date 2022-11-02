import { Field, Int, ObjectType } from '@nestjs/graphql';

import { Course } from './course.entity';

@ObjectType()
export class PaginatedCourses {
  @Field(() => Int)
  page: number;

  @Field(() => Int)
  totalPages: number;

  @Field(() => Boolean)
  hasNext: boolean;

  @Field(() => Boolean)
  hasPrev: boolean;

  @Field(() => [Course])
  courses: Course[];
}
