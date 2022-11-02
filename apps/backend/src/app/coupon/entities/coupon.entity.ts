import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

import { Course } from '../../course/entities/course.entity';
import getPriceConfig from '../../utils/getPriceConfig';

@Entity()
@ObjectType()
export class Coupon {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'coupon id.' })
  id: number;

  @Column()
  @Field(() => String, {
    description: 'coupon description or reason of existence.',
  })
  description: string;

  @Column({ unique: true })
  code: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  @Field(() => Float, { description: 'reduction percent.' })
  percent: string;

  @Column(getPriceConfig({ nullable: true }))
  @Field(() => Float, { description: 'maximum effect that coupon has.' })
  maxEffect?: string;

  @Column('date')
  @Field(() => Date, { description: 'expiration date.' })
  expiresAt: Date;

  @Column({ default: false })
  @Field(() => Boolean, {
    description: 'if this is set to true it can affect all courses.',
  })
  applyToEveryThing: boolean;

  @CreateDateColumn()
  @Field(() => Date, { description: 'coupon creation date.' })
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date, { description: 'coupon update date.' })
  updatedAt: Date;

  @ManyToMany(() => Course, (course) => course.coupons)
  courses: Course[];
}
