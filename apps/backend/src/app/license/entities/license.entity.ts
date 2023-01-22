import { Field, Int, ObjectType } from '@nestjs/graphql';

import { Course } from '../../course/entities/course.entity';
import { User } from '../../user/entities/user.entity';

@ObjectType()
export class License {
  @Field(() => Int, { description: 'license id.' })
  id: number;

  @Field(() => String, { description: 'generated license code.' })
  licenseCode: string;

  @Field(() => String, { description: 'generated license id.' })
  licenseId: string;

  @Field(() => String, { description: 'generated license url.' })
  licenseUrl: string;

  @Field(() => Date, { description: 'creation time of license code.' })
  createdAt: Date;

  @Field(() => User, { description: 'consumer of license code.' })
  user: User;

  @Field(() => [Course], {
    description: 'courses that this license works for.',
  })
  courses: Course[];
}
