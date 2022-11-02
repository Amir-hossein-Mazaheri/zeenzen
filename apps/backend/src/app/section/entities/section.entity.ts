import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
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
import { Lecture } from '../../lecture/entities/lecture.entity';

@Entity()
@ObjectType()
export class Section {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'section.' })
  id: number;

  @Column()
  @Field(() => String, { description: 'section label/title.' })
  label: string;

  @Column({ type: 'int', default: 0 })
  @Field(() => Int, { description: 'total section duration.' })
  duration?: number;

  @Column('text')
  @Field(() => String, { description: 'section description in markup.' })
  description: string;

  @CreateDateColumn()
  @Field(() => Date, { description: 'section creation date.' })
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date, { description: 'section update date.' })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Course, (course) => course.sections)
  @Field(() => Course, {
    nullable: true,
    description: 'parent course of section.',
  })
  course: Course;

  @OneToMany(() => Lecture, (lecture) => lecture.section)
  @Field(() => Lecture, {
    nullable: true,
    description: 'section related lectures.',
  })
  lectures: Lecture[];
}
