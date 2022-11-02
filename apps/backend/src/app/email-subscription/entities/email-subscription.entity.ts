import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class EmailSubscription {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'subscription id.' })
  id: number;

  @Column({ length: 100, unique: true })
  @Field(() => String, { description: 'subscription email.' })
  email: string;

  @CreateDateColumn()
  @Field(() => Date, {
    description: 'time of start subscription.',
  })
  subscriptedAt: Date;
}
