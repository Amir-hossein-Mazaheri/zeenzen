import { InputType, Field } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty } from 'class-validator';

import { ExpertiseLevel } from '../../types';

@InputType()
export class CreateExpertiseInput {
  @Field(() => String, { description: 'expertise title/label.' })
  @IsNotEmpty()
  label: string;

  @Field(() => ExpertiseLevel, {
    description:
      'expertise level based on junior, senior, mid-level and so on.',
  })
  @IsNotEmpty()
  @IsEnum(ExpertiseLevel)
  level: ExpertiseLevel;
}
