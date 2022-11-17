import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '@zeenzen/database';

import { CouponService } from './coupon.service';
import { CouponResolver } from './coupon.resolver';
import { Coupon } from './entities/coupon.entity';
import { CartModule } from '../cart/cart.module';
import { CourseModule } from '../course/course.module';
import { LogsModule } from '../logs/logs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Coupon]),
    CourseModule,
    CartModule,
    LogsModule,
    DatabaseModule,
  ],
  providers: [CouponResolver, CouponService],
})
export class CouponModule {}
