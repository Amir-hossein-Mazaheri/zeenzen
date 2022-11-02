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
import { PreRequirementLevel } from '../../types';

@Entity()
@ObjectType()
export class PreRequirement {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'pre requirement id.' })
  id: number;

  @Column()
  @Field(() => String, { description: 'pre requirement label/title.' })
  label: string;

  @Column({
    type: 'enum',
    enum: PreRequirementLevel,
  })
  @Field(() => PreRequirementLevel, {
    description: 'level that pre requirement, require.',
  })
  level: PreRequirementLevel;

  @Column('text')
  @Field(() => String, {
    description: 'pre requirement description in markup.',
  })
  description: string;

  @Column()
  @Field(() => String, {
    description: 'an image or logo that relates to pre requirement.',
  })
  image: string;

  @ManyToOne(() => Course, (course) => course.preRequirements)
  course: Course;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
