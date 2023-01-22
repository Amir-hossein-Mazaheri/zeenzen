import { InputType, Field, PartialType, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

import { CreateCouponInput } from './create-coupon.input';

@InputType()
export class UpdateCouponInput extends PartialType(CreateCouponInput) {
  @Field(() => Int, { description: 'target coupon id.' })
  @IsNotEmpty()
  id: number;
}
