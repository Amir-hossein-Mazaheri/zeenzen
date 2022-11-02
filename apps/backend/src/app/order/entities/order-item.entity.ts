import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Course } from '../../course/entities/course.entity';
import getPriceConfig from '../../utils/getPriceConfig';
import { Order } from './order.entity';

@Entity()
@ObjectType()
export class OrderItem {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'order item id.' })
  id: number;

  @Column('int')
  @Field(() => Int, { description: 'quantity of courses.' })
  quantity: number;

  @Column(getPriceConfig())
  @Field(() => Float, {
    description: 'unit price of order item which is decimal.',
  })
  unitPrice: string;

  @Column(getPriceConfig())
  @Field(() => Float, {
    description: 'unit price with discount of order item which is decimal.',
  })
  unitPriceWithDiscount: string;

  @ManyToOne(() => Course, (course) => course.orderItems)
  @Field(() => Course, { description: 'order item course.' })
  course: Course;

  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;
}
