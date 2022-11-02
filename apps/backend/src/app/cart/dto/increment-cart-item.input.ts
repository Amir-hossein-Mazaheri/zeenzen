import { InputType } from '@nestjs/graphql';

import { AddCartItemInput } from './add-cart-item.input';

@InputType()
export class IncrementCartItemInput extends AddCartItemInput {}
