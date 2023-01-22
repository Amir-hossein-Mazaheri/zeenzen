import { InputType, Field, PickType, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

import { CreateCommentInput } from './create-comment.input';

@InputType()
export class UpdateCommentInput extends PickType(CreateCommentInput, [
  'content',
]) {
  @Field(() => Int, { description: 'target comment id.' })
  @IsNotEmpty()
  id: number;
}
