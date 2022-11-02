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
import { SocialType } from '../../types';

@Entity()
@ObjectType()
export class Social {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'social id.' })
  id: number;

  @Column({ type: 'enum', enum: SocialType })
  @Field(() => SocialType, { description: 'social type which is description.' })
  type: SocialType;

  @Column()
  @Field(() => String, { description: 'link to user social account/page.' })
  link: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date, { description: 'social update date.' })
  updatedAt: Date;

  @ManyToOne(() => Instructor, (instructor) => instructor.courses)
  instructor: Instructor;
}
