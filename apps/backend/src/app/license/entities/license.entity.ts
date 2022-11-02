import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Course } from '../../course/entities/course.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
@ObjectType()
export class License {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'license id.' })
  id: number;

  @Column()
  @Field(() => String, { description: 'generated license code.' })
  licenseCode: string;

  @Column()
  @Field(() => String, { description: 'generated license id.' })
  licenseId: string;

  @Column()
  @Field(() => String, { description: 'generated license url.' })
  licenseUrl: string;

  @CreateDateColumn()
  @Field(() => Date, { description: 'creation time of license code.' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.licenses)
  @Field(() => User, { description: 'consumer of license code.' })
  user: User;

  @ManyToMany(() => Course, (course) => course.licenses)
  @Field(() => [Course], {
    description: 'courses that this license works for.',
  })
  courses: Course[];
}
