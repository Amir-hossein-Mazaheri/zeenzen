import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Course } from '../../course/entities/course.entity';
import { User } from '../../user/entities/user.entity';

@ObjectType()
export class Question {
  @Field(() => ID, { description: 'question id.' })
  id: number;

  @Field(() => String, { description: 'body of question.' })
  question: string;

  @Field(() => String, { description: 'answer of question.' })
  answer: string;

  @Field(() => Boolean, {
    description:
      "state of question, if isClosed is true question and answer can't be modified.",
  })
  isClosed?: boolean;

  @Field(() => Date, { description: 'question creation date.' })
  createdAt: Date;

  @Field(() => Date, { description: 'question update date.' })
  updatedAt: Date;

  deletedAt: Date;

  @Field(() => User, { description: 'user that asked the question.' })
  whoAsked: User;

  @Field(() => User, {
    nullable: true,
    description: 'user that answered the question.',
  })
  whoAnswered: User;

  @Field(() => Course, { description: 'course which question is related to.' })
  course: Course;
}
