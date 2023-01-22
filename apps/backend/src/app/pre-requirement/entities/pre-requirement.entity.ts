import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Course } from '../../course/entities/course.entity';
import { PreRequirementLevel } from '../../types';

@ObjectType()
export class PreRequirement {
  @Field(() => ID, { description: 'pre requirement id.' })
  id: number;

  @Field(() => String, { description: 'pre requirement label/title.' })
  label: string;

  @Field(() => PreRequirementLevel, {
    description: 'level that pre requirement, require.',
  })
  level: PreRequirementLevel;

  @Field(() => String, {
    description: 'pre requirement description in markup.',
  })
  description: string;

  @Field(() => String, {
    description: 'an image or logo that relates to pre requirement.',
  })
  image: string;

  course: Course;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date;
}
