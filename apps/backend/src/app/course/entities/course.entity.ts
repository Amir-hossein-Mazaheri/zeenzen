import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';

import { CartItem } from '../../cart/entities/cart-item.entity';
import { Category } from '../../category/entities/category.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { Coupon } from '../../coupon/entities/coupon.entity';
import { Instructor } from '../../instructor/entities/instructor.entity';
import { License } from '../../license/entities/license.entity';
import { OrderItem } from '../../order/entities/order-item.entity';
import { PreRequirement } from '../../pre-requirement/entities/pre-requirement.entity';
import { Question } from '../../question/entities/question.entity';
import { Section } from '../../section/entities/section.entity';
import { CourseLevel } from '../../types';
import { CourseImage } from '../../uploads/entities/course-image.entity';
import { User } from '../../user/entities/user.entity';

@ObjectType()
export class Course {
  @Field(() => ID, { description: 'course id.' })
  id: number;

  @Field(() => String, { description: 'spot player created course code.' })
  spotPlayerCourseId: string;

  @Field(() => String, { description: 'course title.' })
  title: string;

  @Field(() => String, {
    description: 'short description that is shown in courses list.',
  })
  shortDescription: string;

  @Field(() => String, {
    nullable: true,
    description: 'description for pre requirements in markup',
  })
  preRequirementsDescription: string;

  @Field(() => String, { description: 'course description in markup.' })
  description: string;

  @Field(() => CourseLevel, { description: 'course level which is an enum.' })
  level: CourseLevel;

  @Field(() => Int, { description: 'total participants of course.' })
  participantsCount?: number;

  @Field(() => Int, { description: 'total lectures of course.' })
  lecturesCount: number;

  @Field(() => Int, { description: 'total hours of course.' })
  hoursCount?: number;

  @Field(() => Float, { description: 'price of course.' })
  price: string;

  @Field(() => Float, { description: 'progress that made for course.' })
  progress?: string;

  @Field(() => String, {
    description: 'amount of discount that is applied to course price.',
  })
  discountPercent?: string;

  isDraft: boolean;

  @Field(() => Date, { description: 'course creation date.' })
  createdAt: Date;

  @Field(() => Date, { description: 'course update date.' })
  updatedAt: Date;

  deletedAt: Date;

  @Field(() => CourseImage, {
    description: 'course images which includes the image and cover image.',
  })
  image: CourseImage;

  preRequirements: PreRequirement[];

  comments: Comment[];

  categories: Category[];

  cartItems: CartItem[];

  orderItems: OrderItem[];

  @Field(() => [Instructor], { description: 'instructors of course.' })
  instructors: Instructor[];

  sections: Section[];

  participants: User[];

  questions: Question[];

  coupons: Coupon[];

  licenses: License[];
}
