import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

import { CreateExpertiseInput } from './create-expertise.input';

@InputType()
export class UpdateExpertiseInput extends PartialType(CreateExpertiseInput) {
  @Field(() => ID, { description: 'target expertise id.' })
  id: number;
}
