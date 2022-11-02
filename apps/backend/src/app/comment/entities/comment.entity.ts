import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Course } from '../../course/entities/course.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
@ObjectType()
export class Comment {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'comment id.' })
  id: number;

  @Column('text')
  @Field(() => String, { description: 'comment content or body.' })
  content: string;

  @Column({ default: false })
  @Field(() => Boolean, { description: 'is published to public or not.' })
  isPublished: boolean;

  @CreateDateColumn()
  @Field(() => Date, { description: 'comment creation date.' })
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date, { description: 'update data of comment.' })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  /* self relation */
  @ManyToOne(() => Comment, (comment) => comment.replies)
  parent: Comment;

  @OneToMany(() => Comment, (comment) => comment.parent)
  @Field(() => [Comment], {
    nullable: true,
    description: "list of comment's replies.",
  })
  replies: Comment[];
  /* self relation */

  @ManyToOne(() => User, (user) => user.comments)
  @Field(() => User, { description: 'author of comment.' })
  author: User;

  @ManyToOne(() => Course, (course) => course.comments)
  course: Course;
}
