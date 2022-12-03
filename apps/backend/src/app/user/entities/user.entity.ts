import { Field, ObjectType, Float, ID } from '@nestjs/graphql';

import { Cart } from '../../cart/entities/cart.entity';
import { Category } from '../../category/entities/category.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { Course } from '../../course/entities/course.entity';
import { Instructor } from '../../instructor/entities/instructor.entity';
import { Order } from '../../order/entities/order.entity';
import { Question } from '../../question/entities/question.entity';
import { UserRole } from '../../types';

@ObjectType()
export class User {
  @Field(() => ID, { description: 'user id.' })
  id: number;

  @Field(() => String, { nullable: true, description: 'user firstname.' })
  firstname?: string;

  @Field(() => String, { nullable: true, description: 'user lastname.' })
  lastname?: string;

  @Field(() => String, {
    description: 'user email which is unique and must for sign up.',
  })
  email: string;

  @Field(() => String, {
    nullable: true,
    description: 'user phone number which is unique.',
  })
  phoneNumber?: string;

  @Field(() => UserRole, { description: 'user role which is enum.' })
  role: UserRole;

  password: string;

  @Field(() => Float, { description: 'total scores gained by user.' })
  scores: string;

  @Field(() => Float, {
    description: 'user score gain rate which depends on user activity.',
  })
  scoreGainRate: string;

  @Field(() => Date, { description: 'user creation date.' })
  createdAt: Date;

  @Field(() => Date, { description: 'user update date.' })
  updatedAt: Date;

  deletedAt: Date;

  @Field(() => Cart, { nullable: true, description: 'user cart.' })
  cart?: Cart;

  @Field(() => [Comment], { nullable: true, description: 'all user comments.' })
  comments?: Comment[];

  @Field(() => Instructor, {
    nullable: true,
    description: 'if user is an instructor this field relates to.',
  })
  instructor?: Instructor;

  @Field(() => [Order], { nullable: true, description: 'all of user orders.' })
  orders?: Order[];

  @Field(() => [Question], {
    nullable: true,
    description: 'all of user asked questions.',
  })
  askedQuestions: Question[];

  @Field(() => [Question], {
    nullable: true,
    description: 'all of user answered question.',
  })
  answeredQuestions: Question[];

  @Field(() => [Course], {
    nullable: true,
    description: 'all of user bought courses.',
  })
  courses: Course[];

  @Field(() => [Category], {
    nullable: true,
    description:
      'user created category, its useful when user is admin or instructor.',
  })
  createdCategories: Category[];
}
