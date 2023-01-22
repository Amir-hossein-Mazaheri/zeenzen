import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Course } from '../../course/entities/course.entity';
import { Expertise } from '../../expertise/entities/expertise.entity';
import { Social } from '../../social/entities/social.entity';
import { User } from '../../user/entities/user.entity';

@ObjectType()
export class Instructor {
  @Field(() => ID, { description: 'instructor id.' })
  id: number;

  @Field(() => String, { description: 'a short description about instructor.' })
  about: string;

  @Field(() => Date, { description: 'instructor creation date.' })
  createdAt: Date;

  @Field(() => Date, { description: 'instructor update date.' })
  updatedAt: Date;

  @Field(() => User, {
    description: 'user related instructor.',
  })
  user: User;

  @Field(() => [Course], {
    nullable: true,
    description: 'courses that instructor is the instructor of them.',
  })
  courses: Course[];

  @Field(() => [Expertise], {
    nullable: true,
    description: 'list of instructor expertises.',
  })
  expertises: Expertise[];

  @Field(() => [Expertise], {
    nullable: true,
    description: 'list of instructor social medias.',
  })
  socials: Social[];
}
