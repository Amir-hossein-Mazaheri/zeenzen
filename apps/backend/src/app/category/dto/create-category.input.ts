import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateCategoryInput {
  @Field(() => String, { description: 'category label/tag' })
  @IsNotEmpty()
  label: string;
}
