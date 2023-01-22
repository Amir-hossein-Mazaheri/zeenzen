import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

import { Payment } from '../../payment/entities/payment.entity';
import { OrderStatus } from '../../types';
import { User } from '../../user/entities/user.entity';
import { OrderItem } from './order-item.entity';

@ObjectType()
export class Order {
  @Field(() => Int, { description: 'order id.' })
  id: number;

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

  @Field(() => String, { description: 'payment method/gate.' })
  paymentMethod: string;

  @Field(() => OrderStatus, { description: 'status of order which is enum.' })
  status: OrderStatus;

  @Field(() => Date, { description: 'creation date of order.' })
  createdAt: Date;

  user: User;

  @Field(() => [OrderItem], { description: 'order items.' })
  orderItems: OrderItem[];

  payment: Payment;
}
