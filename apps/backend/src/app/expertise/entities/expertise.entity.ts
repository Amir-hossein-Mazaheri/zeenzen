import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Instructor } from '../../instructor/entities/instructor.entity';
import { ExpertiseLevel } from '../../types';

@Entity()
@ObjectType()
export class Expertise {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'expertise id.' })
  id: number;

  @Column()
  @Field(() => String, { description: 'expertise label/title.' })
  label: string;

  @Column({ default: false })
  @Field(() => Boolean, {
    description:
      "determine wether an expertise is instructor's primary or not.",
  })
  isPrimary: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: false })
  @Field(() => Boolean, {
    description: 'determine wether expertise is validated by admin or not.',
  })
  validated: boolean;

  @Column({ type: 'enum', enum: ExpertiseLevel })
  @Field(() => ExpertiseLevel, {
    description: 'expertise level which is an enum.',
  })
  level: ExpertiseLevel;

  @ManyToOne(() => Instructor, (instructor) => instructor.expertises)
  @Field(() => Instructor, {
    description: 'instructor that expertise relates to.',
  })
  instructor: Instructor;
}
