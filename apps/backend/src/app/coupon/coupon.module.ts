import { Module } from '@nestjs/common';
import { DatabaseModule } from '@zeenzen/database';

import { CouponService } from './coupon.service';
import { CouponResolver } from './coupon.resolver';
import { CartModule } from '../cart/cart.module';
import { CourseModule } from '../course/course.module';
import { LogsModule } from '../logs/logs.module';

@Module({
  imports: [CourseModule, CartModule, LogsModule, DatabaseModule],
  providers: [CouponResolver, CouponService],
})
export class CouponModule {}
