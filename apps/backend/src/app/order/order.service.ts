import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, FindOptionsWhere, QueryRunner, Repository } from 'typeorm';

import { PlaceOrderInput } from './dto/place-order.input';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { CartService } from '../cart/cart.service';
import { Cart } from '../cart/entities/cart.entity';
import { Course } from '../course/entities/course.entity';
import { LogsService } from '../logs/logs.service';
import { RequestUser, UserRole, OrderStatus } from '../types';
import { User } from '../user/entities/user.entity';
import { PrismaService } from '@zeenzen/database';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(
    // @InjectRepository(Order) private orderRepository: Repository<Order>,
    // @InjectRepository(OrderItem)
    // private orderItemRepository: Repository<OrderItem>,
    // @InjectRepository(Cart) private cartRepository: Repository<Cart>,
    // @InjectRepository(User) private userRepository: Repository<User>,
    // @InjectRepository(Course) private courseRepository: Repository<Course>,
    // private dataSource: DataSource,
    private cartService: CartService,
    private logsService: LogsService,
    private readonly prismaService: PrismaService
  ) {}

  private getWhereOptions(user: RequestUser, id?: number) {
    // const findOptions: FindOptionsWhere<Order> = {};

    // if (id) {
    //   findOptions.id = id;
    // }

    // if (user.role !== UserRole.ADMIN) {
    //   findOptions.user = { id: user.sub };
    // }

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

  async validateOrder(id: number, user: RequestUser) {
    // const order = await this.orderRepository.findOneBy(
    //   this.getFindOptions(user, id)
    // );
    const order = await this.prismaService.order.findFirst({
      where: this.getWhereOptions(user, id),
    });

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
    // const newOrderItem = new OrderItem();
    // newOrderItem.course = course;
    // newOrderItem.order = order;
    // newOrderItem.quantity = quantity;
    // newOrderItem.unitPrice = unitPrice;
    // newOrderItem.unitPriceWithDiscount = unitPriceWithDiscount;

    // await queryRunner.manager.save(newOrderItem);

    // return newOrderItem;

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

    // const queryRunner = this.dataSource.createQueryRunner();
    // await queryRunner.connect();
    // await queryRunner.startTransaction();
    // try {
    //   const cart = await queryRunner.manager.findOne(Cart, {
    //     where: { id: cartId, user: { id: user.sub } },
    //     relations: {
    //       cartItems: {
    //         course: true,
    //       },
    //       user: true,
    //     },
    //   });
    //   const newOrder = new Order();
    //   newOrder.totalPrice = cart.totalPrice;
    //   newOrder.totalPriceWithDiscount = cart.totalPriceWithDiscount;
    //   newOrder.user = cart.user;
    //   newOrder.paymentMethod = 'test-payment-method';
    //   await queryRunner.manager.save(newOrder);
    //   for (const {
    //     course,
    //     quantity,
    //     unitPrice,
    //     unitPriceWithDiscount,
    //   } of cart.cartItems) {
    //     await this.createOrderItem(queryRunner, {
    //       course,
    //       quantity,
    //       unitPrice,
    //       unitPriceWithDiscount,
    //       order: newOrder,
    //     });
    //   }
    //   await this.cartService.emptyCart(cartId, user, queryRunner);
    //   await queryRunner.commitTransaction();
    //   return newOrder;
    // } catch (err) {
    //   await queryRunner.rollbackTransaction();
    //   await this.logsService.logError('placeOrder', err);
    //   throw new InternalServerErrorException(
    //     'Something went wrong while trying to place order.'
    //   );
    // } finally {
    //   await queryRunner.release();
    // }
  }

  // returns all users order
  // if the user is admin it returns all of them
  async findAll(user: RequestUser) {
    // return await this.orderRepository.findBy(this.getWhereOptions(user));
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
    // const order = await queryRunner.manager.findOne(Order, {
    //   where: this.getWhereOptions(user, orderId),
    //   relations: {
    //     orderItems: {
    //       course: {
    //         participants: true,
    //       },
    //     },
    //     user: true,
    //   },
    // });

    // order.status = OrderStatus.FULFILLED;

    // for (const orderItem of order.orderItems) {
    // const course = this.courseRepository.create(
    //   orderItem.course
    // ) as unknown as Course;
    // course.participants.push(order.user);
    // course.participantsCount++;
    // await queryRunner.manager.save(course);
    // }

    // await queryRunner.manager.save(order);

    // await queryRunner.commitTransaction();

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
