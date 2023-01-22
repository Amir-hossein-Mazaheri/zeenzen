import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@zeenzen/database';
import { Prisma } from '@prisma/client';

import { AddCartItemInput } from './dto/add-cart-item.input';
import { DecrementCartItemInput } from './dto/decrement-cart-item.input';
import { IncrementCartItemInput } from './dto/increment-cart-item.input';
import { LogsService } from '../logs/logs.service';
import { RequestUser } from '../types';

@Injectable()
export class CartService {
  constructor(
    private logsService: LogsService,
    private readonly prismaService: PrismaService
  ) {}

  async validateCart(
    id: string,
    user: RequestUser,
    transaction?: Prisma.TransactionClient,
    includeCartItems = false
  ) {
    const findOptions: Prisma.CartFindFirstArgs = {
      where: {
        id,
        user: {
          id: user.sub,
        },
      },
      include: {
        cartItems: includeCartItems,
      },
    };

    let cart: Prisma.CartGetPayload<unknown>;

    if (transaction) {
      cart = await transaction.cart.findFirst(findOptions);
    } else {
      cart = await this.prismaService.cart.findFirst(findOptions);
    }

    if (!cart) {
      throw new NotFoundException('Invalid cart id.');
    }

    return cart;
  }

  async validateCartItem(
    courseId: number,
    cartId: string,
    transaction: Prisma.TransactionClient,
    shouldThrow = false
  ) {
    const cartItem = await transaction.cartItem.findFirst({
      where: {
        course: {
          id: courseId,
        },
        cart: {
          id: cartId,
        },
      },
    });

    if (!cartItem) {
      if (shouldThrow) {
        throw new NotFoundException('Invalid cart item.');
      }
      return false;
    }

    return cartItem;
  }

  async modifyCartItem(
    { cartId, courseId, quantity }: IncrementCartItemInput,
    user: RequestUser,
    decrement = false
  ) {
    // TODO: add on catch error log
    return this.prismaService.$transaction(async (tx) => {
      const cartItem = (await this.validateCartItem(
        courseId,
        cartId,
        tx,
        true
      )) as Prisma.CartItemGetPayload<{
        include: {
          cart: false;
        };
      }>;

      if (!decrement) {
        cartItem.quantity += quantity;
      } else {
        cartItem.quantity -= quantity;
      }

      return await tx.cartItem.update({
        where: {
          id: cartItem.id,
        },
        data: cartItem,
      });
    });
  }

  async getCartItems(cartId: string) {
    return await this.prismaService.cartItem.findMany({
      where: {
        cart: {
          id: cartId,
        },
      },
    });
  }

  async create(user: RequestUser) {
    const currUser = await this.prismaService.user.findFirst({
      where: {
        id: user.sub,
        cart: {
          NOT: null,
        },
      },
    });

    if (!currUser) {
      throw new BadRequestException('User already have cart.');
    }

    return await this.prismaService.cart.create({
      data: {
        user: {
          connect: {
            id: user.sub,
          },
        },
      },
    });
  }

  async findAll() {
    //
  }

  // id is string because its uuid which is a string type
  async findOne(id: string, user: RequestUser) {
    const cart = await this.validateCart(id, user);

    const {
      _sum: {
        unitPrice: totalPrice,
        unitPriceWithDiscount: totalPriceWithDiscount,
      },
    } = await this.prismaService.cartItem.aggregate({
      _sum: {
        unitPrice: true,
        unitPriceWithDiscount: true,
      },
    });

    return {
      ...cart,
      totalPrice: totalPrice ?? '0.00',
      totalPriceWithDiscount: totalPriceWithDiscount ?? '0.00',
    };
  }

  async addItem(
    { cartId, courseId, quantity }: AddCartItemInput,
    user: RequestUser
  ) {
    return await this.prismaService.$transaction(async (tx) => {
      const course = await tx.course.findUnique({
        where: {
          id: courseId,
        },
      });

      const cartItem = await this.validateCartItem(courseId, cartId, tx);

      if (cartItem) {
        return await this.incrementCartItem(
          { cartId, courseId, quantity },
          user
        );
      }

      return await tx.cartItem.create({
        data: {
          quantity,
          unitPrice: course.price,
          unitPriceWithDiscount: course.price,

          cart: {
            connect: {
              id: cartId,
            },
          },

          course: {
            connect: {
              id: course.id,
            },
          },
        },
      });
    });
  }

  async incrementCartItem(
    incrementCartItemInput: IncrementCartItemInput,
    user: RequestUser
  ) {
    return await this.modifyCartItem(incrementCartItemInput, user);
  }

  async decrementCartItem(
    decrementCartItemInput: DecrementCartItemInput,
    user: RequestUser
  ) {
    const { courseId, cartId, quantity } = decrementCartItemInput;

    return await this.prismaService.$transaction(async (tx) => {
      const cartItem = (await this.validateCartItem(
        courseId,
        cartId,
        tx
      )) as Prisma.CartItemGetPayload<{
        include: {
          cart: false;
        };
      }>;

      if (cartItem.quantity <= quantity) {
        await this.removeCartItem(cartItem.id, tx);

        return cartItem;
      }

      return await this.modifyCartItem(decrementCartItemInput, user, true);
    });
  }

  //! Note: it can be a part of outer transaction
  async removeCartItem(id: number, transaction: Prisma.TransactionClient) {
    return await transaction.cartItem.delete({
      where: {
        id,
      },
    });
  }

  // empty cart flow:
  // 1. validates and save the cart into a variable
  // 2. modify and clear the total price and total price with discount
  // 3. deletes all related cart items
  // 4. saves the modified cart
  //! Note: all of those steps can be parts of a outer transaction
  async emptyCart(
    id: string,
    user: RequestUser,
    transaction: Prisma.TransactionClient
  ) {
    const cart = await this.validateCart(id, user, transaction, true);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // TODO: fix this and remove ts-ignore
    const cartItemsIds = cart.cartItems.map(({ id }) => id);

    return await this.prismaService.cartItem.deleteMany({
      where: {
        id: {
          in: cartItemsIds,
        },
      },
    });
  }
}
