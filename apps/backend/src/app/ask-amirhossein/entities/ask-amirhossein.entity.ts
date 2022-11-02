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
export class AskAmirhossein {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'ask amirhossein id.' })
  id: number;

  @Column({ length: 1000 })
  @Field(() => String, { description: 'question body.' })
  question: string;

  @Column({ length: 1000, nullable: true })
  @Field(() => String, { nullable: true, description: 'answer body.' })
  answer: string;

  @Column({ length: 100 })
  @Field(() => String, {
    description:
      'person who asked question email, if user is logged in its not needed.',
  })
  email: string;

  @CreateDateColumn()
  @Field(() => Date, { description: 'creation time of question.' })
  createdAt: Date;

  @Column({ type: 'date', nullable: true })
  @Field(() => Date, {
    nullable: true,
    description: 'answer time of question.',
  })
  answeredAt: Date;

  @ManyToOne(() => User, (user) => user.askAmirhosseins)
  @Field(() => User, {
    description: 'if user is logged in this will be assigned.',
  })
  user: User;
}
