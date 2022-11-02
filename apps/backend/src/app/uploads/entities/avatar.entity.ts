import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

import { User } from '../../user/entities/user.entity';

@Entity()
@ObjectType()
export class Avatar {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID, { description: 'avatar id which is uuid.' })
  id: string;

  @Column()
  @Field(() => String, { description: 'avatar saved file name.' })
  name: string;

  @Column()
  @Field(() => String, { description: 'avatar original file name.' })
  originalName: string;

  @Column({ length: 1000 })
  @Field(() => String, { description: 'full url to avatar image.' })
  fullPath: string;

  @CreateDateColumn()
  @Field(() => Date, { description: 'avatar creation data.' })
  createdAt: Date;

  @OneToOne(() => User, (user) => user.avatar)
  user: User;
}
