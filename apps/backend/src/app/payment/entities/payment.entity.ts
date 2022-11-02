import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID } from '@nestjs/graphql';

import { PaymentTrack } from './payment-track';
import { Order } from '../../order/entities/order.entity';
import { PaymentStatus } from '../../types';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID, { description: 'payment unique id.' })
  id: string;

  @Column({ type: 'text', unique: true })
  @Field(() => String, {
    description: 'payment unique id which is returned by payment gate api.',
  })
  paymentId: string;

  @Column({ type: 'decimal', precision: 20, scale: 2 })
  amount: string;

  @Column({ type: 'enum', enum: PaymentStatus })
  @Field(() => PaymentStatus, {
    description: 'payment status which comes from payment gateway.',
  })
  status: PaymentStatus;

  @CreateDateColumn()
  @Field(() => Date, { description: 'time that payment created.' })
  time: Date;

  @ManyToOne(() => User, (user) => user.payments)
  @Field(() => User, {
    nullable: true,
    description: 'user who requested the payment.',
  })
  user: User;

  @OneToOne(() => Order, (order) => order.payment)
  @Field(() => Order, {
    nullable: true,
    description: 'order which is requested to pay for.',
  })
  order: Order;

  @OneToOne(() => PaymentTrack, (paymentTrack) => paymentTrack.payment)
  @JoinColumn()
  paymentTrack: PaymentTrack;
}
