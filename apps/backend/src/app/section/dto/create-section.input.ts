import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsPositive } from 'class-validator';

@InputType()
export class CreateSectionInput {
  @Field(() => String, { description: 'section label/title.' })
  @IsNotEmpty()
  label: string;

  // in seconds
  @Field(() => Int, { nullable: true, description: 'total section duration.' })
  @IsOptional()
  @IsNotEmpty()
  @IsPositive()
  duration?: number;

  @Field(() => String, { description: 'section description.' })
  @IsNotEmpty()
  description: string;
}
