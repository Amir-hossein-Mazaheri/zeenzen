import { Field, Int, InputType } from '@nestjs/graphql';

import { CourseLevel } from '../../types';

@InputType()
export class PaginatedCoursesFilterInput {
  @Field(() => Int, {
    description: 'page index(starts from 1).',
    defaultValue: 1,
  })
  page: number;

  @Field(() => [CourseLevel], {
    description: 'course level which is an enum.',
    nullable: true,
  })
  levels: CourseLevel[];

  @Field(() => [Int], { description: 'course category id(s).', nullable: true })
  categories: number[];
}
