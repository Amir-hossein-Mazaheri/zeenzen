import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Section } from '../../section/entities/section.entity';

@Entity()
@ObjectType()
export class Lecture {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'lecture id.' })
  id: number;

  @Column()
  @Field(() => String, { description: 'lecture label/title.' })
  label: string;

  @Column({ type: 'int', default: 0 })
  @Field(() => Int, { description: 'total duration of lecture.' })
  duration: number;

  @CreateDateColumn()
  @Field(() => Date, { description: 'lecture creation date.' })
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date, { description: 'update lecture date.' })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Section, (section) => section.lectures)
  section: Section;
}
