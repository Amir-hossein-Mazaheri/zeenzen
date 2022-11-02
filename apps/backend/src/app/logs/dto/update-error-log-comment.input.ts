import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateErrorLogComment {
  @Field(() => String, { description: 'target error log id.' })
  @IsNotEmpty()
  errorLogId: string;

  @Field(() => String, {
    description:
      'error comment or description or any other note about fixing it.',
  })
  @IsNotEmpty()
  comment: string;
}
