import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { CartService } from './cart.service';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { AddCartItemInput } from './dto/add-cart-item.input';
import { IncrementCartItemInput } from './dto/increment-cart-item.input';
import { DecrementCartItemInput } from './dto/decrement-cart-item.input';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { RequestUser, UserRole } from '../types';
import { Roles } from '../user/decorators/roles.decorator';
import { GetUser } from '../user/decorators/user.decorator';

@UseGuards(AuthenticatedGuard)
@Resolver(() => Cart)
export class CartResolver {
  constructor(private readonly cartService: CartService) {}

  @ResolveField('cartItems', () => [CartItem], {
    nullable: true,
    description: 'resolve cart items field.',
  })
  getCartItems(@Parent() cart: Cart) {
    return this.cartService.getCartItems(cart.id);
  }

  @Mutation(() => Cart, { description: 'creates an empty cart for user.' })
  createCart(@GetUser() user: RequestUser) {
    return this.cartService.create(user);
  }

  @Roles(UserRole.ADMIN)
  @Query(() => [Cart], {
    name: 'carts',
    description: 'returns all of cart(only for admins).',
  })
  findAll() {
    return this.cartService.findAll();
  }

  @Query(() => Cart, {
    name: 'cart',
    description:
      'returns a single cart that belongs to user or if the user is admin it can returns any of them.',
  })
  findOne(
    @Args('id', { type: () => String }) id: string,
    @GetUser() user: RequestUser
  ) {
    return this.cartService.findOne(id, user);
  }

  @Mutation(() => CartItem, { description: 'adds item to cart.' })
  addCartItem(
    @Args('addCartItemInput') addCartItemInput: AddCartItemInput,
    @GetUser() user: RequestUser
  ) {
    return this.cartService.addItem(addCartItemInput, user);
  }

  @Mutation(() => CartItem)
  incrementCartItem(
    @Args('incrementCartItem') incrementCartItem: IncrementCartItemInput,
    @GetUser() user: RequestUser
  ) {
    return this.cartService.incrementCartItem(incrementCartItem, user);
  }

  @Mutation(() => CartItem)
  decrementCartItem(
    @Args('decrementCartItem') decrementCartItem: DecrementCartItemInput,
    @GetUser() user: RequestUser
  ) {
    return this.cartService.decrementCartItem(decrementCartItem, user);
  }
}
