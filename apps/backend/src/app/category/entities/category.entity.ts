import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Course } from '../../course/entities/course.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
@ObjectType()
export class Category {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'category id.' })
  id: number;

  @Column()
  @Field(() => String, { description: 'category label.' })
  label: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Course, (course) => course.categories)
  courses: Course[];

  @ManyToOne(() => User, (user) => user.createdCategories)
  @Field(() => User, { description: 'person who created the category.' })
  createdBy: User;
}
