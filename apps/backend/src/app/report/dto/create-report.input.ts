import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateReportInput {
  @Field(() => String, {
    description:
      'report title which should contain the section that is reported.',
  })
  @IsNotEmpty()
  title: string;

  @Field(() => String, {
    description:
      'content which should contain reason and some description about report.',
  })
  @IsNotEmpty()
  content: string;
}
