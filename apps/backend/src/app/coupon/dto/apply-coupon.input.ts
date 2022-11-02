import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class ApplyCouponInput {
  @Field(() => String, {
    description: 'target cart that coupon should apply on.',
  })
  @IsNotEmpty()
  @IsUUID()
  cartId: string;

  @Field(() => String, { description: 'a valid coupon code.' })
  @IsNotEmpty()
  couponCode: string;
}
