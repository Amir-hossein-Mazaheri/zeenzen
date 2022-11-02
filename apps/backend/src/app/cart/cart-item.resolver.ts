import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Course } from '../course/entities/course.entity';

import { CartItemService } from './cart-item.service';
import { CartItem } from './entities/cart-item.entity';

@Resolver(() => CartItem)
export class CartItemResolver {
  constructor(private readonly cartItemService: CartItemService) {}

  @ResolveField('course', () => Course)
  getCourse(@Parent() cartItem: CartItem) {
    return this.cartItemService.getCourse(cartItem.id);
  }
}
