import { InputType } from '@nestjs/graphql';

import { AddCartItemInput } from './add-cart-item.input';

@InputType()
export class DecrementCartItemInput extends AddCartItemInput {}
