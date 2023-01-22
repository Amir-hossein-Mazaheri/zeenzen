import { InputType, Field, Int } from '@nestjs/graphql';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  Max,
  Min,
} from 'class-validator';

@InputType()
export class CreateCouponInput {
  @Field(() => String, { description: 'coupon description or reason of it.' })
  @IsNotEmpty()
  description: string;

  @Field(() => String, { description: 'a unique coupon code.' })
  @IsNotEmpty()
  code: string;

  @Field(() => String, { description: 'amount of effect that coupon has.' })
  @IsNotEmpty()
  @Min(0)
  @Max(100)
  percent: string;

  @Field(() => String, {
    nullable: true,
    description: 'maximum effect or reduction that coupon can apply.',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsPositive()
  maxEffect?: string;

  @Field(() => Date, {
    description: 'expiration date of coupon which should be utc',
  })
  @IsNotEmpty()
  @IsDate()
  expiresAt: Date;

  @Field(() => [Int], {
    nullable: true,
    description: 'courses that coupon has effect on.',
  })
  @IsOptional()
  @IsNotEmpty()
  coursesId?: number[];

  @Field(() => Boolean, {
    nullable: true,
    description:
      'make coupon that applies to all courses, makes a conflict whit coursesId field.',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  applyToEveryThing?: boolean;
}
