import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Course } from '../../course/entities/course.entity';
import { User } from '../../user/entities/user.entity';

@ObjectType()
export class Comment {
  @Field(() => ID, { description: 'comment id.' })
  id: number;

  @Field(() => String, { description: 'comment content or body.' })
  content: string;

  @Field(() => Boolean, { description: 'is published to public or not.' })
  isPublished: boolean;

  @Field(() => Date, { description: 'comment creation date.' })
  createdAt: Date;

  @Field(() => Date, { description: 'update data of comment.' })
  updatedAt: Date;

  deletedAt: Date;

  /* self relation */
  parent: Comment;

  @Field(() => [Comment], {
    nullable: true,
    description: "list of comment's replies.",
  })
  replies: Comment[];
  /* self relation */

  @Field(() => User, { description: 'author of comment.' })
  author: User;

  course: Course;
}
