import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserLogStatus } from '../../types';
import { User } from '../../user/entities/user.entity';

@Entity()
@ObjectType()
export class UserLog {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'user log id.' })
  id: string;

  @Column({ type: 'enum', enum: UserLogStatus })
  @Field(() => UserLogStatus, {
    description: 'determine wether user is logged in or logged out.',
  })
  status: UserLogStatus;

  @CreateDateColumn()
  @Field(() => Date, { description: 'time that log is created.' })
  time: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.logs)
  @Field(() => User, { description: 'user related.' })
  user: User;
}
