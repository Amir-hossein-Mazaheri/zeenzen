import { InputType, Field, PartialType, Int } from '@nestjs/graphql';

import { CreatePreRequirementInput } from './create-pre-requirement.input';

@InputType()
export class UpdatePreRequirementInput extends PartialType(
  CreatePreRequirementInput
) {
  @Field(() => Int, { description: 'target pre requirement id.' })
  id: number;
}
