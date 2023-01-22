import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumberString } from 'class-validator';

@InputType()
export class CreateCommentInput {
  @Field(() => String, { description: 'comment content or body.' })
  @IsNotEmpty()
  content: string;

  @Field(() => Int, { description: 'target course id.' })
  @IsNotEmpty()
  @IsNumberString()
  courseId: number;
}
