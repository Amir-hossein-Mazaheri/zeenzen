import { InputType, PickType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

import { CreateCommentInput } from './create-comment.input';

@InputType()
export class ReplyCommentInput extends PickType(CreateCommentInput, [
  'content',
]) {
  @Field(() => Int, { description: 'parent comment id.' })
  @IsNotEmpty()
  parentId: number;
}
