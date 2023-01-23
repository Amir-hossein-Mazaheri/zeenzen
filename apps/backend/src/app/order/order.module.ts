import { Module } from '@nestjs/common';
import { DatabaseModule } from '@zeenzen/database';

import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { CartModule } from '../cart/cart.module';
import { CourseModule } from '../course/course.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [CartModule, UserModule, CourseModule, DatabaseModule],
  providers: [OrderService, OrderResolver],
  exports: [OrderService],
})
export class OrderModule {}
