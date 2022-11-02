import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, IsNull, QueryRunner, Repository } from 'typeorm';
import Decimal from 'decimal.js';

import { AddCartItemInput } from './dto/add-cart-item.input';
import { DecrementCartItemInput } from './dto/decrement-cart-item.input';
import { IncrementCartItemInput } from './dto/increment-cart-item.input';
import { CartItem } from './entities/cart-item.entity';
import { Cart } from './entities/cart.entity';
import { Course } from '../course/entities/course.entity';
import { LogsService } from '../logs/logs.service';
import { RequestUser, MixedKeyValue } from '../types';
import { User } from '../user/entities/user.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    @InjectRepository(Course) private courseRepository: Repository<Course>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private dataSource: DataSource,
    private logsService: LogsService
  ) {}

  async validateCart(
    id: string,
    user: RequestUser,
    viaQueryRunner = false,
    queryRunner?: QueryRunner,
    includeCartItems = false
  ) {
    const findOptions: MixedKeyValue = {
      where: { id, user: { id: user.sub } },
    };

    if (includeCartItems) {
      findOptions.relations = { cartItems: true };
    }

    let cart: Cart;

    if (viaQueryRunner) {
      cart = await queryRunner.manager.findOne(Cart, findOptions);
    } else {
      cart = await this.cartRepository.findOne(findOptions);
    }

    if (!cart) {
      throw new NotFoundException('Invalid cart id.');
    }

    return cart;
  }

  async validateCartItem(
    courseId: number,
    cartId: string,
    queryRunner: QueryRunner,
    shouldThrow = false
  ) {
    const cartItem = await queryRunner.manager.findOneBy(CartItem, {
      course: { id: courseId },
      cart: { id: cartId },
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
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      const cartItem = (await this.validateCartItem(
        courseId,
        cartId,
        queryRunner,
        true
      )) as CartItem;

      if (!decrement) {
        cartItem.quantity += quantity;
      } else {
        cartItem.quantity -= quantity;
      }

      await queryRunner.manager.save(cartItem);

      await queryRunner.commitTransaction();

      return cartItem;
    } catch (err) {
      await queryRunner.rollbackTransaction();

      await this.logsService.logError('modifyCartItem', err);

      throw new InternalServerErrorException(
        'Something went wrong while trying to add cart item.'
      );
    } finally {
      await queryRunner.release();
    }
  }

  async getCartItems(cartId: string) {
    return await this.cartItemRepository.findBy({ cart: { id: cartId } });
  }

  async create(user: RequestUser) {
    const currUser = await this.userRepository.findOneBy({
      id: user.sub,
      cart: IsNull(),
    });

    if (!currUser) {
      throw new BadRequestException('User already have cart.');
    }

    const newCart = new Cart();
    newCart.user = currUser;

    await this.cartRepository.manager.save(newCart);

    return newCart;
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

    const { totalPrice, totalPriceWithDiscount } = await this.cartItemRepository
      .createQueryBuilder('cartItems')
      .where({ cart: { id } })
      .select('SUM(cartItems.unitPrice)', 'totalPrice')
      .addSelect(
        'SUM(cartItems.unitPriceWithDiscount)',
        'totalPriceWithDiscount'
      )
      .getRawOne<{ totalPrice: number; totalPriceWithDiscount: number }>();

    return { ...cart, totalPrice, totalPriceWithDiscount };
  }

  async addItem(
    { cartId, courseId, quantity }: AddCartItemInput,
    user: RequestUser
  ) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      const course = await queryRunner.manager.findOneBy(Course, {
        id: courseId,
      });
      const cart = await this.validateCart(cartId, user, true, queryRunner);

      const cartItem = await this.validateCartItem(
        courseId,
        cartId,
        queryRunner
      );

      if (cartItem) {
        return await this.incrementCartItem(
          { cartId, courseId, quantity },
          user
        );
      }

      const newCartItem = new CartItem();
      newCartItem.cart = cart;
      newCartItem.course = course;
      newCartItem.quantity = quantity;
      newCartItem.unitPrice = course.price;
      newCartItem.unitPriceWithDiscount = course.price;

      await queryRunner.manager.save(newCartItem);

      await queryRunner.commitTransaction();

      return newCartItem;
    } catch (err) {
      await queryRunner.rollbackTransaction();

      console.log(err);

      await this.logsService.logError('addItem', err);

      throw new InternalServerErrorException(
        'Something went wrong while trying to add cart item.'
      );
    } finally {
      await queryRunner.release();
    }
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

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();

    const cartItem = (await this.validateCartItem(
      courseId,
      cartId,
      queryRunner,
      true
    )) as CartItem;

    if (cartItem.quantity <= quantity) {
      queryRunner.startTransaction();

      try {
        await this.removeCartItem(cartItem.id, queryRunner);

        await queryRunner.commitTransaction();

        return cartItem;
      } catch (err) {
        await queryRunner.rollbackTransaction();

        await this.logsService.logError('decrementCartItem', err);

        throw new InternalServerErrorException(
          'Something went wrong while trying to decrement cart item.'
        );
      } finally {
        await queryRunner.release();
      }
    }

    return await this.modifyCartItem(decrementCartItemInput, user, true);
  }

  //! Note: it can be a part of outer transaction
  async removeCartItem(id: number, queryRunner: QueryRunner) {
    return await queryRunner.manager.delete(CartItem, id);
  }

  // empty cart flow:
  // 1. validates and save the cart into a variable
  // 2. modify and clear the total price and total price with discount
  // 3. deletes all related cart items
  // 4. saves the modified cart
  //! Note: all of those steps can be parts of a outer transaction
  async emptyCart(id: string, user: RequestUser, queryRunner: QueryRunner) {
    const cart = await this.validateCart(id, user, true, queryRunner, true);
    // cart.totalPrice = 0;
    // cart.totalPriceWithDiscount = 0;
    cart.totalPrice = new Decimal('0.00').toString();
    cart.totalPriceWithDiscount = new Decimal('0.00').toString();

    const cartItemsIds = cart.cartItems.map(({ id }) => id);

    await this.dataSource
      .createQueryBuilder()
      .setQueryRunner(queryRunner)
      .delete()
      .from<CartItem>(CartItem)
      .where({ id: In(cartItemsIds) })
      .execute();

    // make the cart price zero
    await queryRunner.manager.save(cart);
  }

  // clear owner less carts flow:
  // 0. start transaction
  // 1. get all of the carts
  // 2. filter owner less carts
  // 3. deletes all of related cart items
  // 4. deletes all owner less carts
  // 5. commit transaction
  async clearOwnerLessCarts() {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      const carts = await queryRunner.manager.find(Cart, {
        relations: {
          cartItems: true,
          user: true,
        },
      });

      // used filter method because I couldn't find a way to query that :)
      const ownerLessCarts = carts.filter((cart) => !cart.user);

      console.log(ownerLessCarts, ownerLessCarts.length);

      const cartsIds: string[] = [];
      const cartItemsIds: number[] = [];

      for (const cart of ownerLessCarts) {
        cartsIds.push(cart.id);

        for (const cartItems of cart.cartItems) {
          cartItemsIds.push(cartItems.id);
        }
      }

      await this.dataSource
        .createQueryBuilder()
        .setQueryRunner(queryRunner)
        .delete()
        .from(CartItem)
        .where({ id: In(cartItemsIds) })
        .execute();

      await this.dataSource
        .createQueryBuilder()
        .setQueryRunner(queryRunner)
        .delete()
        .from(Cart)
        .where({ id: In(cartsIds) })
        .execute();

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();

      await this.logsService.logError('clearOwnerLessCarts', err);
    } finally {
      await queryRunner.release();
    }
  }
}
