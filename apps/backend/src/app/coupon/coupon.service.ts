import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
import * as moment from 'moment';
import Decimal from 'decimal.js';
import { PrismaService } from '@zeenzen/database';

import { CreateCouponInput } from './dto/create-coupon.input';
import { UpdateCouponInput } from './dto/update-coupon.input';
import { Coupon } from './entities/coupon.entity';
import { ApplyCouponInput } from './dto/apply-coupon.input';
import { CartService } from '../cart/cart.service';
import { Course } from '../course/entities/course.entity';
import { LogsService } from '../logs/logs.service';
import { RequestUser } from '../types';
import { toCamelCase } from '../utils/toCamelCase';
import { Prisma } from '@prisma/client';

@Injectable()
export class CouponService {
  private readonly relations = ['course'];

  constructor(
    // @InjectRepository(Coupon) private couponRepository: Repository<Coupon>,
    // @InjectRepository(Course) private courseRepository: Repository<Course>,
    // private dataSource: DataSource,
    // private cartService: CartService,
    // private logsService: LogsService,
    private readonly prismaService: PrismaService
  ) {}

  async validateCoupon(id: number) {
    // const coupon = await this.couponRepository.findOne({
    //   where: { id },
    //   relations: this.relations,
    // });

    const coupon = await this.prismaService.coupon.findUnique({
      where: {
        id,
      },
      include: {
        courses: true,
      },
    });

    if (!coupon) {
      throw new NotFoundException('Invalid coupon id.');
    }

    return coupon;
  }

  throwConflictOnCoursesIdAndApplyToEveryThing(
    applyToEveryThing: boolean,
    courseId: number[]
  ) {
    if (applyToEveryThing && courseId) {
      throw new ConflictException(
        "Courses id and apply to every thing can't be passed together"
      );
    }
  }

  reducePriceByPercent(
    price: Prisma.Decimal,
    percent: Prisma.Decimal,
    maxEffect?: Prisma.Decimal
  ) {
    // const reducedPrice = price - price * percent;

    // return reducedPrice < maxEffect ? price - maxEffect : reducedPrice;

    const actualPercent = percent.div(100);
    const reducedPrice = price.minus(price.mul(actualPercent));

    if (maxEffect) {
      return reducedPrice.gt(maxEffect) ? price.minus(maxEffect) : reducedPrice;
    }

    return reducedPrice;
  }

  async create({
    description,
    code,
    percent,
    maxEffect,
    expiresAt,
    applyToEveryThing,
    coursesId,
  }: CreateCouponInput) {
    this.throwConflictOnCoursesIdAndApplyToEveryThing(
      applyToEveryThing,
      coursesId
    );

    // const newCoupon = new Coupon();
    // newCoupon.description = description;
    // newCoupon.code = code;
    // newCoupon.expiresAt = moment.utc(expiresAt).toDate();
    // newCoupon.percent = percent;

    // if (maxEffect) {
    //   newCoupon.maxEffect = maxEffect;
    // }

    // if (coursesId) {
    //   newCoupon.courses = await this.courseRepository.findBy({
    //     id: In(coursesId),
    //   });
    // }

    // if (applyToEveryThing) {
    //   newCoupon.applyToEveryThing = applyToEveryThing;
    // }

    // await this.couponRepository.manager.save(newCoupon);

    // return newCoupon;

    return await this.prismaService.$transaction(async (tx) => {
      const createCouponData: Prisma.CouponCreateInput = {
        description,
        code,
        expiresAt: moment.utc(expiresAt).toDate(),
        percent,
      };

      if (maxEffect) {
        createCouponData.maxEffect = maxEffect;
      }

      if (coursesId) {
        createCouponData.courses = {
          connect: await tx.course.findMany({
            where: {
              id: {
                in: coursesId,
              },
            },
          }),
        };
      }

      return await tx.coupon.create({
        data: createCouponData,
      });
    });
  }

  async findAll() {
    // return await this.couponRepository.find({ relations: this.relations });
    return await this.prismaService.coupon.findMany({
      include: {
        courses: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.validateCoupon(id);
  }

  async update(id: number, updateCouponInput: UpdateCouponInput) {
    this.throwConflictOnCoursesIdAndApplyToEveryThing(
      updateCouponInput.applyToEveryThing,
      updateCouponInput.coursesId
    );

    await this.validateCoupon(id);

    // const coupon = await this.dataSource
    //   .createQueryBuilder()
    //   .update(Coupon)
    //   .set(updateCouponInput)
    //   .where({ id })
    //   .returning('*')
    //   .execute();

    // return toCamelCase(coupon);

    return await this.prismaService.coupon.update({
      where: {
        id,
      },
      data: updateCouponInput,
    });
  }

  async remove(id: number) {
    await this.validateCoupon(id);

    // await this.dataSource
    //   .createQueryBuilder()
    //   .delete()
    //   .from(Coupon)
    //   .where({ id })
    //   .execute();

    // return coupon;

    return await this.prismaService.coupon.delete({
      where: {
        id,
      },
    });
  }

  async apply({ cartId, couponCode }: ApplyCouponInput, user: RequestUser) {
    return await this.prismaService.$transaction(async (tx) => {
      const coupon = await tx.coupon.findFirst({
        where: {
          code: couponCode,
        },
      });

      const cart = await tx.cart.findFirst({
        where: {
          id: cartId,
          user: {
            id: user.sub,
          },
        },
        include: {
          cartItems: true,
        },
      });

      return await tx.cart.update({
        where: {
          id: cartId,
        },
        data: {
          cartItems: {
            updateMany: {
              where: {
                cartId,
              },
              data: cart.cartItems.map((cartItem) => ({
                ...cartItem,
                unitPriceWithDiscount: this.reducePriceByPercent(
                  cartItem.unitPrice,
                  coupon.percent,
                  coupon.maxEffect
                ),
              })),
            },
          },
        },
      });
    });

    // const queryRunner = this.dataSource.createQueryRunner();
    // await queryRunner.connect();
    // await queryRunner.startTransaction();
    // try {
    //   const coupon = await queryRunner.manager.findOne(Coupon, {
    //     where: { code: couponCode },
    //     relations: this.relations,
    //   });
    //   const cart = await queryRunner.manager.findOne(Cart, {
    //     where: { id: cartId, user: { id: user.sub } },
    //     relations: {
    //       cartItems: {
    //         course: true,
    //       },
    //     },
    //   });
    //   for (const cartItem of cart.cartItems) {
    //     if (
    //       coupon.applyToEveryThing ||
    //       coupon.courses.some((course) => course.id === cartItem.course.id)
    //     ) {
    //       cartItem.totalPriceWithDiscount = this.reducePriceByPercent(
    //         new Decimal(cartItem.totalPrice),
    //         new Decimal(coupon.percent),
    //         new Decimal(coupon.maxEffect),
    //       ).toString();
    //     }
    //   }
    //   await queryRunner.manager.save(cart);
    //   await queryRunner.commitTransaction();
    //   return coupon;
    // } catch (err) {
    //   await queryRunner.rollbackTransaction();
    //   await this.logsService.logError('applyCoupon', err);
    //   throw new InternalServerErrorException(
    //     'Something went wrong while trying to apply coupon code.',
    //   );
    // } finally {
    //   await queryRunner.release();
    // }
  }

  async misApply(cartId: string, user: RequestUser) {
    return await this.prismaService.$transaction(async (tx) => {
      const cart = await tx.cart.findFirst({
        where: {
          id: cartId,
          user: {
            id: user.sub,
          },
        },
        include: {
          cartItems: true,
        },
      });

      return await tx.cart.update({
        where: {
          id: cartId,
        },
        data: {
          cartItems: {
            updateMany: {
              where: {
                cartId,
              },
              data: cart.cartItems.map((cartItem) => ({
                ...cartItem,
                unitPriceWithDiscount: cartItem.unitPrice,
              })),
            },
          },
        },
      });
    });
  }
}
