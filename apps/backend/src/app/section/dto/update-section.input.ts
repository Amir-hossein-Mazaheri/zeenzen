import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

import { CreateSectionInput } from './create-section.input';

@InputType()
export class UpdateSectionInput extends PartialType(CreateSectionInput) {
  @Field(() => ID, { description: 'target section id.' })
  @IsNotEmpty()
  id: number;
}
