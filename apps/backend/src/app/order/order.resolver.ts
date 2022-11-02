import { Args, Mutation, Resolver, Query, Int } from '@nestjs/graphql';
import { RequestUser } from '../types';

import { GetUser } from '../user/decorators/user.decorator';
import { PlaceOrderInput } from './dto/place-order.input';
import { Order } from './entities/order.entity';
import { OrderService } from './order.service';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private orderService: OrderService) {}

  @Mutation(() => Order, { description: 'creates an order in pending status.' })
  placeOrder(
    @Args('placeOrderInput') placeOrderInput: PlaceOrderInput,
    @GetUser() user: RequestUser
  ) {
    return this.orderService.placeOrder(placeOrderInput, user);
  }

  @Query(() => [Order], {
    name: 'orders',
    description: 'returns all user orders or all orders if user is admin.',
  })
  findAll(@GetUser() user: RequestUser) {
    return this.orderService.findAll(user);
  }

  @Query(() => Order, {
    name: 'order',
    description:
      'returns a single user order or any other order if user is admin.',
  })
  findOne(
    @Args('id', { type: () => Int }) id: number,
    @GetUser() user: RequestUser
  ) {
    return this.orderService.findOne(id, user);
  }
}
