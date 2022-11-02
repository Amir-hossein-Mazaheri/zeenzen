import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Course } from '../../course/entities/course.entity';
import getPriceConfig from '../../utils/getPriceConfig';
import { Cart } from './cart.entity';

@Entity()
@ObjectType()
export class CartItem {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'cart item id.' })
  id: number;

  @Column(getPriceConfig())
  @Field(() => String, { description: 'cart item unit price.' })
  unitPrice: string;

  @Column(getPriceConfig())
  @Field(() => Float, {
    description: 'total price with discount of cart item.',
  })
  unitPriceWithDiscount: string;

  @Column('int')
  @Field(() => Int, { description: 'quantity of course in the cart item.' })
  quantity: number;

  @ManyToOne(() => Cart, (cart) => cart.cartItems)
  cart: Cart;

  @ManyToOne(() => Course, (course) => course.cartItems)
  @Field(() => Course, { description: 'cart item course.' })
  course: Course;
}
