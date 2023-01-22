import { InputType, Field, PartialType, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

import { CreateSocialInput } from './create-social.input';

@InputType()
export class UpdateSocialInput extends PartialType(CreateSocialInput) {
  @Field(() => Int, { description: 'target social id.' })
  @IsNotEmpty()
  id: number;
}
