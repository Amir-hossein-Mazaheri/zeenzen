import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../../user/entities/user.entity';

@Entity()
@ObjectType()
export class Report {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'report id.' })
  id: number;

  @Column()
  @Field(() => String, { description: 'report title.' })
  title: string;

  @Column({ length: 1000 })
  @Field(() => String, {
    description:
      'report content which should contain reason and a short description about report.',
  })
  content: string;

  @CreateDateColumn()
  @Field(() => Date, { description: 'time that report been captured.' })
  reportedAt: Date;

  @ManyToOne(() => User, (user) => user.reports)
  @Field(() => User, {
    description: 'user who reported if the user is logged in.',
  })
  user: User;
}
