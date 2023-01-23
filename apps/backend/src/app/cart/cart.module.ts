import { Module } from '@nestjs/common';
import { DatabaseModule } from '@zeenzen/database';

import { CartService } from './cart.service';
import { CartResolver } from './cart.resolver';
import { CartItemResolver } from './cart-item.resolver';
import { CartItemService } from './cart-item.service';
import { CourseModule } from '../course/course.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule, CourseModule, DatabaseModule],
  providers: [CartService, CartResolver, CartItemResolver, CartItemService],
  exports: [CartService],
})
export class CartModule {}
