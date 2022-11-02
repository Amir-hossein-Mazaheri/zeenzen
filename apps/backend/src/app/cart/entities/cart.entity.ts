import { Field, ObjectType } from '@nestjs/graphql';
import {
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../../user/entities/user.entity';
import { CartItem } from './cart-item.entity';

@Entity()
@ObjectType()
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, {
    defaultValue: '0',
    description: 'cart id which is an uuid.',
  })
  id: string;

  @Field(() => String, {
    defaultValue: '0',
    description: 'aggregated unit price.',
  })
  totalPrice: string;

  @Field(() => String, { description: 'aggregated unit price with discount.' })
  totalPriceWithDiscount: string;

  @CreateDateColumn()
  @Field(() => Date, { description: 'cart creation data.' })
  createdAt: Date;

  @OneToOne(() => User, (user) => user.cart)
  user: User;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  @Field(() => [CartItem], { nullable: true, description: 'cart items' })
  cartItems: CartItem[];
}
