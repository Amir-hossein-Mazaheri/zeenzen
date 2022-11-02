import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

import { PreRequirementLevel } from '../../types';

@InputType()
export class CreatePreRequirementInput {
  @Field(() => String, { description: 'pre requirement label/title.' })
  @IsNotEmpty()
  label: string;

  @Field(() => String, { description: 'pre requirement description.' })
  @IsNotEmpty()
  description: string;

  @Field(() => PreRequirementLevel, { description: 'pre requirement level.' })
  @IsNotEmpty()
  level: PreRequirementLevel;

  @Field(() => String, { description: 'related image to pre requirement.' })
  @IsNotEmpty()
  image: string;
}
