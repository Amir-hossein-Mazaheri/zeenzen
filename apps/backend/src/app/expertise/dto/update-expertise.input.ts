import { InputType, Field, PartialType, Int } from '@nestjs/graphql';

import { CreateExpertiseInput } from './create-expertise.input';

@InputType()
export class UpdateExpertiseInput extends PartialType(CreateExpertiseInput) {
  @Field(() => Int, { description: 'target expertise id.' })
  id: number;
}
