import { Field, ID } from '@nestjs/graphql';

import { PaymentTrack } from './payment-track';
import { Order } from '../../order/entities/order.entity';
import { PaymentStatus } from '../../types';
import { User } from '../../user/entities/user.entity';

export class Payment {
  @Field(() => ID, { description: 'payment unique id.' })
  id: string;

  @Field(() => String, {
    description: 'payment unique id which is returned by payment gate api.',
  })
  paymentId: string;

  amount: string;

  @Field(() => PaymentStatus, {
    description: 'payment status which comes from payment gateway.',
  })
  status: PaymentStatus;

  @Field(() => Date, { description: 'time that payment created.' })
  time: Date;

  @Field(() => User, {
    nullable: true,
    description: 'user who requested the payment.',
  })
  user: User;

  @Field(() => Order, {
    nullable: true,
    description: 'order which is requested to pay for.',
  })
  order: Order;

  paymentTrack: PaymentTrack;
}
