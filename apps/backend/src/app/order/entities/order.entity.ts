import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Payment } from '../../payment/entities/payment.entity';
import { OrderStatus } from '../../types';
import { User } from '../../user/entities/user.entity';
import { OrderItem } from './order-item.entity';

@Entity()
@ObjectType()
export class Order {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'order id.' })
  id: number;

  @Column({ default: false })
  @Field(() => Boolean, {
    description: 'shows that order has discount or not.',
  })
  hasDiscount: boolean;

  @Field(() => Float, { description: 'total price which is decimal.' })
  totalPrice: string;

  @Field(() => Float, {
    description: 'total price with discount which is decimal.',
  })
  totalPriceWithDiscount: string;

  @Column()
  @Field(() => String, { description: 'payment method/gate.' })
  paymentMethod: string;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  @Field(() => OrderStatus, { description: 'status of order which is enum.' })
  status: OrderStatus;

  @CreateDateColumn()
  @Field(() => Date, { description: 'creation date of order.' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  @Field(() => [OrderItem], { description: 'order items.' })
  orderItems: OrderItem[];

  @OneToOne(() => Payment, (payment) => payment.order)
  @JoinColumn()
  payment: Payment;
}
