import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { CouponService } from './coupon.service';
import { Coupon } from './entities/coupon.entity';
import { CreateCouponInput } from './dto/create-coupon.input';
import { UpdateCouponInput } from './dto/update-coupon.input';
import { ApplyCouponInput } from './dto/apply-coupon.input';
import { UserRole, RequestUser } from '../types';
import { Roles } from '../user/decorators/roles.decorator';

@Roles(UserRole.ADMIN)
@Resolver(() => Coupon)
export class CouponResolver {
  constructor(private readonly couponService: CouponService) {}

  @Mutation(() => Coupon, { description: 'creates a coupon.' })
  createCoupon(
    @Args('createCouponInput') createCouponInput: CreateCouponInput
  ) {
    return this.couponService.create(createCouponInput);
  }

  @Query(() => [Coupon], {
    name: 'coupons',
    description: 'returns all coupons.',
  })
  findAll() {
    return this.couponService.findAll();
  }

  @Query(() => Coupon, {
    name: 'coupon',
    description: 'returns a single coupon.',
  })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.couponService.findOne(id);
  }

  @Mutation(() => Coupon, {
    description: 'updates and returns updated coupon.',
  })
  updateCoupon(
    @Args('updateCouponInput') updateCouponInput: UpdateCouponInput
  ) {
    return this.couponService.update(updateCouponInput.id, updateCouponInput);
  }

  @Mutation(() => Coupon, { description: 'removes coupon.' })
  removeCoupon(@Args('id', { type: () => Int }) id: number) {
    return this.couponService.remove(id);
  }

  @Roles(UserRole.CUSTOMER)
  @Mutation(() => Coupon, {
    description:
      'applies coupon to all courses in cart which are in list of coupon courses and then updates the total price with discount of cart.',
  })
  applyCoupon(
    @Args('applyCouponInput') applyCouponInput: ApplyCouponInput,
    user: RequestUser
  ) {
    return this.couponService.apply(applyCouponInput, user);
  }
}
