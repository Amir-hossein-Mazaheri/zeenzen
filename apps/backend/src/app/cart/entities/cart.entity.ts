import { Field, ObjectType } from '@nestjs/graphql';

import { User } from '../../user/entities/user.entity';
import { CartItem } from './cart-item.entity';

@ObjectType()
export class Cart {
  @Field(() => String, {
    defaultValue: '0',
    description: 'cart id which is an uuid.',
  })
  id: string;

  @Field(() => String, {
    defaultValue: '0',
    description: 'aggregated unit price.',
  })
  totalPrice: string;

  @Field(() => String, { description: 'aggregated unit price with discount.' })
  totalPriceWithDiscount: string;

  @Field(() => Date, { description: 'cart creation data.' })
  createdAt: Date;

  user: User;

  @Field(() => [CartItem], { nullable: true, description: 'cart items' })
  cartItems: CartItem[];
}
