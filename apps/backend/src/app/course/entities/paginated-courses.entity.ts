import { Field, ObjectType } from '@nestjs/graphql';

import { BasePaginated } from '../../utils/BasePaginated';
import { Course } from './course.entity';

@ObjectType()
export class PaginatedCourses extends BasePaginated {
  @Field(() => [Course])
  courses: Course[];
}
