import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

import { Course } from '../../course/entities/course.entity';
import { Order } from './order.entity';

@ObjectType()
export class OrderItem {
  @Field(() => Int, { description: 'order item id.' })
  id: number;

  @Field(() => Int, { description: 'quantity of courses.' })
  quantity: number;

  @Field(() => Float, {
    description: 'unit price of order item which is decimal.',
  })
  unitPrice: string;

  @Field(() => Float, {
    description: 'unit price with discount of order item which is decimal.',
  })
  unitPriceWithDiscount: string;

  @Field(() => Course, { description: 'order item course.' })
  course: Course;

  order: Order;
}
