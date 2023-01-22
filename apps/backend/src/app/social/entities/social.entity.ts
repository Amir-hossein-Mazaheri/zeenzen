import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Instructor } from '../../instructor/entities/instructor.entity';
import { SocialType } from '../../types';

@ObjectType()
export class Social {
  @Field(() => ID, { description: 'social id.' })
  id: number;

  @Field(() => SocialType, { description: 'social type which is description.' })
  type: SocialType;

  @Field(() => String, { description: 'link to user social account/page.' })
  link: string;

  createdAt: Date;

  @Field(() => Date, { description: 'social update date.' })
  updatedAt: Date;

  instructor: Instructor;
}
