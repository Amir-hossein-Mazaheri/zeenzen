import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Course } from '../../course/entities/course.entity';

@Entity()
@ObjectType()
export class CourseImage {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ length: 1000 })
  @Field(() => String, {
    description: 'course image, image which is course main image.',
  })
  image: string;

  @Column({ length: 1000 })
  @Field(() => String, {
    description:
      'course cover image that is only shown in single course pages.',
  })
  coverImage: string;

  @OneToOne(() => Course, (course) => course.image)
  @Field(() => Course, { description: 'related course.' })
  course: Course;

  @CreateDateColumn()
  createdAt: Date;
}
