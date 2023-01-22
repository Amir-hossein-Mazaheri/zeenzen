import { Field, Int, ObjectType } from '@nestjs/graphql';

import { Course } from '../../course/entities/course.entity';
import { User } from '../../user/entities/user.entity';

@ObjectType()
export class Category {
  @Field(() => Int, { description: 'category id.' })
  id: number;

  @Field(() => String, { description: 'category label.' })
  label: string;

  createdAt: Date;

  updatedAt: Date;

  courses: Course[];

  @Field(() => User, { description: 'person who created the category.' })
  createdBy: User;
}
