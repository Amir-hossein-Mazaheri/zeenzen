import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { QuestionService } from './question.service';
import { Question } from './entities/question.entity';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { UpdateQuestionAnswerInput } from './dto/update-question-answer.input';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { RequestUser, UserRole } from '../types';
import { Roles } from '../user/decorators/roles.decorator';
import { GetUser } from '../user/decorators/user.decorator';

@UseGuards(AuthenticatedGuard)
@Resolver(() => Question)
export class QuestionResolver {
  constructor(private readonly questionService: QuestionService) {}

  @Mutation(() => Question, { description: 'creates a question.' })
  createQuestion(
    @Args('createQuestionInput') createQuestionInput: CreateQuestionInput,
    @GetUser() user: RequestUser
  ) {
    return this.questionService.create(createQuestionInput, user);
  }

  @Query(() => [Question], {
    name: 'questions',
    description: 'returns all questions.',
  })
  findAll(@GetUser() user: RequestUser) {
    return this.questionService.findAll(user);
  }

  @Query(() => Question, {
    name: 'question',
    description: 'returns a single question.',
  })
  findOne(
    @Args('id', { type: () => Int }) id: number,
    @GetUser() user: RequestUser
  ) {
    return this.questionService.findOne(id, user);
  }

  @Mutation(() => Question, {
    description: 'updates a question, question body.',
  })
  updateQuestion(
    @Args('updateQuestionInput') updateQuestionInput: UpdateQuestionInput,
    @GetUser() user: RequestUser
  ) {
    return this.questionService.updateQuestion(
      updateQuestionInput.id,
      updateQuestionInput,
      user
    );
  }

  @Roles(UserRole.INSTRUCTOR)
  @Mutation(() => Question, {
    description: 'updates a question, answer(only for instructors).',
  })
  updateQuestionAnswer(
    @Args('updateQuestionAnswerInput')
    updateQuestionAnswerInput: UpdateQuestionAnswerInput,
    @GetUser() user: RequestUser
  ) {
    return this.questionService.updateQuestionAnswer(
      updateQuestionAnswerInput.id,
      updateQuestionAnswerInput,
      user
    );
  }

  @Roles(UserRole.ADMIN)
  @Mutation(() => Question, {
    description: 'soft delete a question(only for admins).',
  })
  removeQuestion(@Args('id', { type: () => Int }) id: number) {
    return this.questionService.remove(id);
  }

  @Roles(UserRole.ADMIN)
  @Mutation(() => Question, { description: 'restore a soft deleted question.' })
  restoreQuestion(@Args('id', { type: () => Int }) id: number) {
    return this.questionService.restore(id);
  }
}
