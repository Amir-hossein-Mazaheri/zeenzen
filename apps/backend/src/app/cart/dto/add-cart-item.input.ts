import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsUUID, Max, Min } from 'class-validator';

@InputType()
export class AddCartItemInput {
  @Field(() => ID, { description: 'target cart id which is uuid.' })
  @IsNotEmpty()
  @IsUUID()
  cartId: string;

  @Field(() => ID, { description: 'course that is meant to be added to cart.' })
  @IsNotEmpty()
  courseId: number;

  @Field(() => Int, { defaultValue: 1 })
  @IsOptional()
  @Min(1)
  @Max(1) // set min and max to one to ensure that doesn't create any issue
  quantity?: number;
}
