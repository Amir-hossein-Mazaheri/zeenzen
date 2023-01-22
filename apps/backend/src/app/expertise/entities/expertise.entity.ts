import { Field, Int, ObjectType } from '@nestjs/graphql';

import { Instructor } from '../../instructor/entities/instructor.entity';
import { ExpertiseLevel } from '../../types';

@ObjectType()
export class Expertise {
  @Field(() => Int, { description: 'expertise id.' })
  id: number;

  @Field(() => String, { description: 'expertise label/title.' })
  label: string;

  @Field(() => Boolean, {
    description:
      "determine wether an expertise is instructor's primary or not.",
  })
  isPrimary: boolean;

  createdAt: Date;

  updatedAt: Date;

  @Field(() => Boolean, {
    description: 'determine wether expertise is validated by admin or not.',
  })
  validated: boolean;

  @Field(() => ExpertiseLevel, {
    description: 'expertise level which is an enum.',
  })
  level: ExpertiseLevel;

  @Field(() => Instructor, {
    description: 'instructor that expertise relates to.',
  })
  instructor: Instructor;
}
