import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

import { CreateCouponInput } from './create-coupon.input';

@InputType()
export class UpdateCouponInput extends PartialType(CreateCouponInput) {
  @Field(() => ID, { description: 'target coupon id.' })
  @IsNotEmpty()
  id: number;
}
