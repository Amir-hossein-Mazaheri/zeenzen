import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class PlaceOrderInput {
  @Field(() => String, { description: 'target cart id which is uuid.' })
  @IsNotEmpty()
  @IsUUID()
  cartId: string;
}
