import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as moment from 'moment';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@zeenzen/database';
import { CreateCouponInput } from './dto/create-coupon.input';
import { UpdateCouponInput } from './dto/update-coupon.input';
import { ApplyCouponInput } from './dto/apply-coupon.input';
import { RequestUser } from '../types';

@Injectable()
export class CouponService {
  private readonly relations = ['course'];

  constructor(private readonly prismaService: PrismaService) {}

  async validateCoupon(id: number) {
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

    return await this.prismaService.coupon.update({
      where: {
        id,
      },
      data: updateCouponInput,
    });
  }

  async remove(id: number) {
    await this.validateCoupon(id);

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
