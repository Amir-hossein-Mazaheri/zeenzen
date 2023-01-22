import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

import { Course } from '../../course/entities/course.entity';
import { Cart } from './cart.entity';

@ObjectType()
export class CartItem {
  @Field(() => Int, { description: 'cart item id.' })
  id: number;

  @Field(() => String, { description: 'cart item unit price.' })
  unitPrice: string;

  @Field(() => Float, {
    description: 'total price with discount of cart item.',
  })
  unitPriceWithDiscount: string;

  @Field(() => Int, { description: 'quantity of course in the cart item.' })
  quantity: number;

  cart: Cart;

  @Field(() => Course, { description: 'cart item course.' })
  course: Course;
}
