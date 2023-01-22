import { Field, Int, ObjectType } from '@nestjs/graphql';

import { Section } from '../../section/entities/section.entity';

@ObjectType()
export class Lecture {
  @Field(() => Int, { description: 'lecture id.' })
  id: number;

  @Field(() => String, { description: 'lecture label/title.' })
  label: string;

  @Field(() => Int, { description: 'total duration of lecture.' })
  duration: number;

  @Field(() => Date, { description: 'lecture creation date.' })
  createdAt: Date;

  @Field(() => Date, { description: 'update lecture date.' })
  updatedAt: Date;

  deletedAt: Date;

  section: Section;
}
