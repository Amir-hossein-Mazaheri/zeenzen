import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

import { Course } from '../../course/entities/course.entity';

@ObjectType()
export class Coupon {
  @Field(() => ID, { description: 'coupon id.' })
  id: number;

  @Field(() => String, {
    description: 'coupon description or reason of existence.',
  })
  description: string;

  code: string;

  @Field(() => Float, { description: 'reduction percent.' })
  percent: string;

  @Field(() => Float, { description: 'maximum effect that coupon has.' })
  maxEffect?: string;

  @Field(() => Date, { description: 'expiration date.' })
  expiresAt: Date;

  @Field(() => Boolean, {
    description: 'if this is set to true it can affect all courses.',
  })
  applyToEveryThing: boolean;

  @Field(() => Date, { description: 'coupon creation date.' })
  createdAt: Date;

  @Field(() => Date, { description: 'coupon update date.' })
  updatedAt: Date;

  courses: Course[];
}
