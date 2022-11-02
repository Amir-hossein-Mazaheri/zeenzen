import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

import { CreatePreRequirementInput } from './create-pre-requirement.input';

@InputType()
export class UpdatePreRequirementInput extends PartialType(
  CreatePreRequirementInput,
) {
  @Field(() => ID, { description: 'target pre requirement id.' })
  id: number;
}
