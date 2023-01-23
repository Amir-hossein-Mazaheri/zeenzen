import { Injectable, NotFoundException } from '@nestjs/common';

import { PlaceOrderInput } from './dto/place-order.input';
import { CartService } from '../cart/cart.service';
import { LogsService } from '../logs/logs.service';
import { RequestUser, UserRole, OrderStatus } from '../types';
import { PrismaService } from '@zeenzen/database';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(
    private cartService: CartService,
    private logsService: LogsService,
    private readonly prismaService: PrismaService
  ) {}

  private getWhereOptions(user: RequestUser, id?: number) {
    const whereOptions: Prisma.OrderWhereInput = {};

    if (id) {
      whereOptions.id = id;
    }

    if (user.role !== UserRole.ADMIN) {
      whereOptions.user = {
        id: user.sub,
      };
    }

    return whereOptions;
  }

  async validateOrder(
    id: number,
    user: RequestUser,
    transaction?: Prisma.TransactionClient
  ) {
    let order: Prisma.OrderGetPayload<unknown>;

    if (transaction) {
      order = await transaction.order.findFirst({
        where: this.getWhereOptions(user, id),
      });
    } else {
      order = await this.prismaService.order.findFirst({
        where: this.getWhereOptions(user, id),
      });
    }

    if (!order) {
      throw new NotFoundException('Invalid order id.');
    }

    return order;
  }

  private async createOrderItem(
    transaction: Prisma.TransactionClient,
    {
      courseId,
      orderId,
      quantity,
      unitPrice,
      unitPriceWithDiscount,
    }: Omit<Prisma.OrderItemGetPayload<unknown>, 'id'>
  ) {
    return await transaction.orderItem.create({
      data: {
        quantity,
        unitPrice,
        unitPriceWithDiscount,

        order: {
          connect: {
            id: orderId,
          },
        },

        course: {
          connect: {
            id: courseId,
          },
        },
      },
    });
  }

  // place order flow:
  // 0. start transaction
  // 1. look for cart and fetch its cart items
  // 2. create a new order
  // 3. copy cart item into order item and assign it to created order
  // 4. empty the user cart
  // 5. commit transaction
  // 6. return crated order
  async placeOrder({ cartId }: PlaceOrderInput, user: RequestUser) {
    return this.prismaService.$transaction(async (tx) => {
      const cart = await tx.cart.findFirst({
        where: {
          id: cartId,
          user: {
            id: user.sub,
          },
        },
        include: {
          user: true,
          cartItems: {
            include: {
              course: true,
            },
          },
        },
      });

      const newOrder = await this.prismaService.order.create({
        data: {
          paymentMethod: 'test-payment-method',
          user: {
            connect: {
              id: user.sub,
            },
          },
        },
      });

      await tx.cartItem.createMany({
        // TODO: test this and make sure it works :)
        data: cart.cartItems,
        skipDuplicates: true,
      });

      await this.cartService.emptyCart(cartId, user, tx);

      return newOrder;
    });
  }

  // returns all users order
  // if the user is admin it returns all of them
  async findAll(user: RequestUser) {
    return await this.prismaService.order.findMany({
      where: this.getWhereOptions(user),
    });
  }

  async findOne(id: number, user: RequestUser) {
    return await this.validateOrder(id, user);
  }

  // order succeed flow:
  // 0. start transaction
  // 1. look for order
  // 2. change the status of order
  // 3. iterate through order items and adds user to course and increment participants count
  // 4. save the changes order
  // 5. commit transaction
  // 6. return succeeded order
  async orderSucceeded(
    orderId: number,
    user: RequestUser,
    transaction: Prisma.TransactionClient
  ) {
    const order = await transaction.order.findFirst({
      where: this.getWhereOptions(user, orderId),
      include: {
        user: true,
        orderItems: {
          include: {
            course: {
              include: {
                users: true,
              },
            },
          },
        },
      },
    });

    // TODO: test this for loop and make sure its working fine
    for (const orderItem of order.orderItems) {
      orderItem.course.participantsCount++;
      orderItem.course.users.push(order.user);

      await transaction.course.update({
        where: {
          id: orderItem.course.id,
        },
        data: {
          ...orderItem.course,
          users: {
            connect: orderItem.course.users,
          },
        },
      });
    }

    // it doesn't update many only updates one record
    return await transaction.order.updateMany({
      where: this.getWhereOptions(user, orderId),
      data: {
        status: OrderStatus.FULFILLED,
      },
    });
  }
}
