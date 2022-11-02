import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Course } from '../../course/entities/course.entity';
import { Expertise } from '../../expertise/entities/expertise.entity';
import { Social } from '../../social/entities/social.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
@ObjectType()
export class Instructor {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'instructor id.' })
  id: number;

  @Column()
  @Field(() => String, { description: 'a short description about instructor.' })
  about: string;

  @CreateDateColumn()
  @Field(() => Date, { description: 'instructor creation date.' })
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date, { description: 'instructor update date.' })
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.instructor)
  @Field(() => User, {
    description: 'user related instructor.',
  })
  user: User;

  @ManyToMany(() => Course, (course) => course.instructors)
  @Field(() => [Course], {
    nullable: true,
    description: 'courses that instructor is the instructor of them.',
  })
  courses: Course[];

  @OneToMany(() => Expertise, (expertise) => expertise.instructor)
  @Field(() => [Expertise], {
    nullable: true,
    description: 'list of instructor expertises.',
  })
  expertises: Expertise[];

  @OneToMany(() => Social, (social) => social.instructor)
  @Field(() => [Expertise], {
    nullable: true,
    description: 'list of instructor social medias.',
  })
  socials: Social[];
}
