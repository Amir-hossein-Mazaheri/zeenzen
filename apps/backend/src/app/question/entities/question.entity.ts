import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Course } from '../../course/entities/course.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
@ObjectType()
export class Question {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'question id.' })
  id: number;

  @Column('text')
  @Field(() => String, { description: 'body of question.' })
  question: string;

  @Column('text')
  @Field(() => String, { description: 'answer of question.' })
  answer: string;

  @Column({ default: false })
  @Field(() => Boolean, {
    description:
      "state of question, if isClosed is true question and answer can't be modified.",
  })
  isClosed?: boolean;

  @CreateDateColumn()
  @Field(() => Date, { description: 'question creation date.' })
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date, { description: 'question update date.' })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.askedQuestions)
  @Field(() => User, { description: 'user that asked the question.' })
  whoAsked: User;

  @ManyToOne(() => User, (user) => user.answeredQuestions)
  @Field(() => User, {
    nullable: true,
    description: 'user that answered the question.',
  })
  whoAnswered: User;

  @ManyToOne(() => Course, (course) => course.questions)
  @Field(() => Course, { description: 'course which question is related to.' })
  course: Course;
}
