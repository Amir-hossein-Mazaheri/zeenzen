import { InputType, Field, ID } from '@nestjs/graphql';
import {
  ArrayNotEmpty,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  Max,
  Min,
} from 'class-validator';

import { CourseLevel } from '../../types';

@InputType()
export class CreateCourseInput {
  @Field(() => ID, { description: 'spot player course id.' })
  @IsNotEmpty()
  spotPlayerCourseId: string;

  @Field(() => String, { description: 'course title.' })
  @IsNotEmpty()
  title: string;

  @Field(() => String, { description: 'course short description.' })
  @IsNotEmpty()
  shortDescription: string;

  @Field(() => String, { description: 'course description.' })
  @IsNotEmpty()
  description: string;

  @Field(() => String, {
    nullable: true,
    description: 'pre requirements description.',
  })
  preRequirementsDescription?: string;

  @Field(() => CourseLevel, {
    nullable: true,
    description: 'course level which is a enum.',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(CourseLevel)
  level?: CourseLevel;

  @Field(() => String, { nullable: true, description: 'course price.' })
  @IsOptional()
  @IsNotEmpty()
  @IsPositive()
  price?: string;

  @Field(() => String, {
    nullable: true,
    description: 'amount of course progress(in percent)',
  })
  @IsOptional()
  @IsNotEmpty()
  @Min(0)
  @Max(100)
  progress?: string; // in percent

  @Field(() => String, {
    nullable: true,
    description: 'amount of course discount(in percent).',
  })
  @IsOptional()
  @IsNotEmpty()
  @Min(0)
  @Max(100)
  discountPercent?: string;

  @Field(() => [ID], { description: 'list of pre requirements ids.' })
  @IsNotEmpty()
  @ArrayNotEmpty()
  preRequirementsId: number[];

  @Field(() => [ID], { description: 'list of categories ids.' })
  @IsNotEmpty()
  @ArrayNotEmpty()
  categoriesId: number[];

  @Field(() => [ID], { description: 'list of instructors ids.' })
  @IsNotEmpty()
  @ArrayNotEmpty()
  instructorsId: number[];

  @Field(() => [ID], { description: 'list of sections ids.' })
  @IsNotEmpty()
  @ArrayNotEmpty()
  sectionsId: number[];
}
