import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '@zeenzen/database';

import { CartService } from './cart.service';
import { CartResolver } from './cart.resolver';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { CartItemResolver } from './cart-item.resolver';
import { CartItemService } from './cart-item.service';
import { CourseModule } from '../course/course.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, CartItem]),
    UserModule,
    CourseModule,
    DatabaseModule,
  ],
  providers: [CartService, CartResolver, CartItemResolver, CartItemService],
  exports: [TypeOrmModule, CartService],
})
export class CartModule {}
