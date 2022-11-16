import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, IsNull, QueryRunner, Repository } from 'typeorm';
import { PrismaService } from '@zeenzen/database';
import Decimal from 'decimal.js';

import { AddCartItemInput } from './dto/add-cart-item.input';
import { DecrementCartItemInput } from './dto/decrement-cart-item.input';
import { IncrementCartItemInput } from './dto/increment-cart-item.input';
import { CartItem } from './entities/cart-item.entity';
import { Cart } from './entities/cart.entity';
import { Course } from '../course/entities/course.entity';
import { LogsService } from '../logs/logs.service';
import { RequestUser } from '../types';
import { User } from '../user/entities/user.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    @InjectRepository(Course) private courseRepository: Repository<Course>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private dataSource: DataSource,
    private logsService: LogsService,
    private readonly prismaService: PrismaService
  ) {}

  async validateCart(
    id: string,
    user: RequestUser,
    // viaQueryRunner = false,
    // queryRunner?: QueryRunner,
    transaction?: Prisma.TransactionClient,
    includeCartItems = false
  ) {
    // const findOptions: MixedKeyValue = {
    //   where: { id, user: { id: user.sub } },
    // };

    // if (includeCartItems) {
    //   findOptions.relations = { cartItems: true };
    // }

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

    let cart: Prisma.CartGetPayload<{
      include: {
        _count: false;
      };
    }>;

    // if (viaQueryRunner) {
    //   cart = await queryRunner.manager.findOne(Cart, findOptions);
    // } else {
    //   cart = await this.cartRepository.findOne(findOptions);
    // }

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
    // const cartItem = await queryRunner.manager.findOneBy(CartItem, {
    //   course: { id: courseId },
    //   cart: { id: cartId },
    // });

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

  // const { totalPrice, totalPriceWithDiscount } = await this.cartItemRepository
  // .createQueryBuilder('cart')
  // .setQueryRunner(queryRunner)
  // .select('SUM(cart.totalPrice)', 'totalPrice')
  // .addSelect('SUM(cart.totalPriceWithDiscount)', 'totalPriceWithDiscount')
  // .getRawOne<{ totalPrice: string; totalPriceWithDiscount: string }>();

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

    // const queryRunner = this.dataSource.createQueryRunner();

    // await queryRunner.connect();

    // await queryRunner.startTransaction();

    // try {
    //   const cartItem = (await this.validateCartItem(
    //     courseId,
    //     cartId,
    //     queryRunner,
    //     true
    //   )) as CartItem;

    //   if (!decrement) {
    //     cartItem.quantity += quantity;
    //   } else {
    //     cartItem.quantity -= quantity;
    //   }

    //   await queryRunner.manager.save(cartItem);

    //   await queryRunner.commitTransaction();

    //   return cartItem;
    // } catch (err) {
    //   await queryRunner.rollbackTransaction();

    //   await this.logsService.logError('modifyCartItem', err);

    //   throw new InternalServerErrorException(
    //     'Something went wrong while trying to add cart item.'
    //   );
    // } finally {
    //   await queryRunner.release();
    // }
  }

  async getCartItems(cartId: string) {
    // return await this.cartItemRepository.findBy({ cart: { id: cartId } });
    return await this.prismaService.cartItem.findMany({
      where: {
        cart: {
          id: cartId,
        },
      },
    });
  }

  async create(user: RequestUser) {
    // const currUser = await this.userRepository.findOneBy({
    //   id: user.sub,
    //   cart: IsNull(),
    // });
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

    // const newCart = new Cart();
    // newCart.user = currUser;

    // await this.cartRepository.manager.save(newCart);

    // return newCart;

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
    const carts = await this.cartRepository.find();

    // TODO: fix totalPrice and totalPriceWithDiscount aggregation
    const { totalPrice, totalPriceWithDiscount } = await this.cartItemRepository
      .createQueryBuilder('cartItems')
      .select('SUM(cartItems.unitPrice)', 'totalPrice')
      .addSelect(
        'SUM(cartItems.unitPriceWithDiscount)',
        'totalPriceWithDiscount'
      )
      .getRawOne<{ totalPrice: number; totalPriceWithDiscount: number }>();

    return await this.cartRepository.find({ where: { user: true } });
  }

  // id is string because its uuid which is a string type
  async findOne(id: string, user: RequestUser) {
    const cart = await this.validateCart(id, user);

    // const { totalPrice, totalPriceWithDiscount } = await this.cartItemRepository
    //   .createQueryBuilder('cartItems')
    //   .where({ cart: { id } })
    //   .select('SUM(cartItems.unitPrice)', 'totalPrice')
    //   .addSelect(
    //     'SUM(cartItems.unitPriceWithDiscount)',
    //     'totalPriceWithDiscount'
    //   )
    //   .getRawOne<{ totalPrice: number; totalPriceWithDiscount: number }>();

    // return {
    //   ...cart,
    //   totalPrice: totalPrice || '0.00',
    //   totalPriceWithDiscount: totalPriceWithDiscount || '0.00',
    // };

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
      totalPrice,
      totalPriceWithDiscount,
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

      const cart = await this.validateCart(cartId, user, tx);

      const cartItem = await this.validateCartItem(courseId, cartId, tx);

      if (cartItem) {
        return await this.incrementCartItem(
          { cartId, courseId, quantity },
          user
        );
      }

      await tx.cartItem.create({
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

    // const queryRunner = this.dataSource.createQueryRunner();

    // await queryRunner.connect();

    // await queryRunner.startTransaction();

    // try {
    //   const course = await queryRunner.manager.findOneBy(Course, {
    //     id: courseId,
    //   });
    //   const cart = await this.validateCart(cartId, user, true, queryRunner);

    //   const cartItem = await this.validateCartItem(
    //     courseId,
    //     cartId,
    //     queryRunner
    //   );

    //   if (cartItem) {
    //     return await this.incrementCartItem(
    //       { cartId, courseId, quantity },
    //       user
    //     );
    //   }

    //   const newCartItem = new CartItem();
    //   newCartItem.cart = cart;
    //   newCartItem.course = course;
    //   newCartItem.quantity = quantity;
    //   newCartItem.unitPrice = course.price;
    //   newCartItem.unitPriceWithDiscount = course.price;

    //   await queryRunner.manager.save(newCartItem);

    //   await queryRunner.commitTransaction();

    //   return newCartItem;
    // } catch (err) {
    //   await queryRunner.rollbackTransaction();

    //   console.log(err);

    //   await this.logsService.logError('addItem', err);

    //   throw new InternalServerErrorException(
    //     'Something went wrong while trying to add cart item.'
    //   );
    // } finally {
    //   await queryRunner.release();
    // }
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

    // const queryRunner = this.dataSource.createQueryRunner();

    // await queryRunner.connect();

    // const cartItem = (await this.validateCartItem(
    //   courseId,
    //   cartId,
    //   queryRunner,
    //   true
    // )) as CartItem;

    // if (cartItem.quantity <= quantity) {
    //   queryRunner.startTransaction();

    //   try {
    //     await this.removeCartItem(cartItem.id, queryRunner);

    //     await queryRunner.commitTransaction();

    //     return cartItem;
    //   } catch (err) {
    //     await queryRunner.rollbackTransaction();

    //     await this.logsService.logError('decrementCartItem', err);

    //     throw new InternalServerErrorException(
    //       'Something went wrong while trying to decrement cart item.'
    //     );
    //   } finally {
    //     await queryRunner.release();
    //   }
    // }

    // return await this.modifyCartItem(decrementCartItemInput, user, true);
  }

  //! Note: it can be a part of outer transaction
  async removeCartItem(id: number, transaction: Prisma.TransactionClient) {
    // return await queryRunner.manager.delete(CartItem, id);
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
    // cart.totalPrice = 0;
    // cart.totalPriceWithDiscount = 0;
    // cart.totalPrice = new Decimal('0.00').toString();
    // cart.totalPriceWithDiscount = new Decimal('0.00').toString();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // TODO: fix this and remove ts-ignore
    const cartItemsIds = cart.cartItems.map(({ id }) => id);

    // await this.dataSource
    //   .createQueryBuilder()
    //   .setQueryRunner(queryRunner)
    //   .delete()
    //   .from<CartItem>(CartItem)
    //   .where({ id: In(cartItemsIds) })
    //   .execute();

    // // make the cart price zero
    // await queryRunner.manager.save(cart);

    return await this.prismaService.cartItem.deleteMany({
      where: {
        id: {
          in: cartItemsIds,
        },
      },
    });
  }
}
