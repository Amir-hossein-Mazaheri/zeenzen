import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsNumberString } from 'class-validator';

@InputType()
export class CreateCommentInput {
  @Field(() => String, { description: 'comment content or body.' })
  @IsNotEmpty()
  content: string;

  @Field(() => ID, { description: 'target course id.' })
  @IsNotEmpty()
  @IsNumberString()
  courseId: number;
}
