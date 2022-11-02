import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { CommentService } from './comment.service';
import { Comment } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { ReplyCommentInput } from './dto/reply-comment.input';
import { Public } from '../auth/decorators/public.decorator';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { RequestUser, UserRole } from '../types';
import { Roles } from '../user/decorators/roles.decorator';
import { GetUser } from '../user/decorators/user.decorator';
import { User } from '../user/entities/user.entity';

@UseGuards(AuthenticatedGuard)
@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @ResolveField('author', () => User)
  getAuthor(@Parent() comment: Comment) {
    console.log(comment.id);
    return this.commentService.getAuthor(comment.id);
  }

  @ResolveField('replies', () => [Comment], { nullable: true })
  getReplies(@Parent() comment: Comment) {
    return this.commentService.getReplies(comment.id);
  }

  @Mutation(() => Comment, { description: 'creates a comment.' })
  createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
    @GetUser() user: RequestUser
  ) {
    return this.commentService.create(createCommentInput, user);
  }

  @Public()
  @Query(() => [Comment], {
    name: 'comments',
    description: "returns all course's comments.",
  })
  findAll(@Args('courseId', { type: () => ID }) courseId: number) {
    return this.commentService.findAll(courseId);
  }

  @Public()
  @Query(() => Comment, {
    name: 'comment',
    description: "returns a single course's comment.",
  })
  findOne(
    @Args('id', { type: () => ID }) id: number,
    @GetUser() user: RequestUser
  ) {
    return this.commentService.findOne(id, user);
  }

  @Mutation(() => Comment, { description: 'updates a comment body' })
  updateComment(
    @Args('updateCommentInput') updateCommentInput: UpdateCommentInput,
    @GetUser() user: RequestUser
  ) {
    return this.commentService.update(
      updateCommentInput.id,
      updateCommentInput,
      user
    );
  }

  @Mutation(() => Comment, { description: 'adds a reply to target comment.' })
  replyComment(
    @Args('replyCommentInput') replyCommentInput: ReplyCommentInput,
    @GetUser() user: RequestUser
  ) {
    return this.commentService.reply(replyCommentInput, user);
  }

  @Roles(UserRole.ADMIN)
  @Mutation(() => Comment, {
    description: 'soft deletes a comment(only for admins).',
  })
  removeComment(@Args('id', { type: () => ID }) id: number) {
    return this.commentService.remove(id);
  }

  @Roles(UserRole.ADMIN)
  @Mutation(() => Comment, {
    description: 'restores a soft deleted comment(only for admins).',
  })
  restoreComment(@Args('id', { type: () => ID }) id: number) {
    return this.commentService.restore(id);
  }
}
