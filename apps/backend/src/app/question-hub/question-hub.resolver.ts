import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GetUser } from '../user/decorators/user.decorator';
import { CreateQuestionHubQuestionInput } from './dto/create-question-hub-question.input';
import { QuestionHub } from './entities/question-hub.entity';
import { QuestionHubService } from './question-hub.service';
import { RequestUser, UserRole } from '../types';
import { QuestionHubQuestion } from './entities/question-hub-question.entity';
import { Roles } from '../user/decorators/roles.decorator';
import { AnswerQuestionHubQuestionInput } from './dto/answer-question-hub-question.input';
import { QuestionHubAnswer } from './entities/question-hub-answer.entity';
import { UpdateQuestionHubAnswerInput } from './dto/update-question-hub-answer.input';
import { UpdateQuestionHubQuestionInput } from './dto/update-question-hub-question.input';
import { FindOneQuestionHubInput } from './dto/find-one-question-hub.input';

@Roles(UserRole.CUSTOMER)
@Resolver(() => QuestionHub)
export class QuestionHubResolver {
  constructor(private readonly questionHubService: QuestionHubService) {}

  @Mutation(() => QuestionHubQuestion, {
    description: 'create new question in target question hub.',
  })
  createQuestionHubQuestion(
    @Args('createQuestionHubQuestionInput')
    createQuestionHubQuestionInput: CreateQuestionHubQuestionInput,
    @GetUser() user: RequestUser
  ) {
    return this.questionHubService.createQuestion(
      createQuestionHubQuestionInput,
      user
    );
  }

  @Roles(UserRole.INSTRUCTOR)
  @Mutation(() => QuestionHubAnswer, {
    description: 'create answer for target question hub question.',
  })
  answerQuestionHubQuestion(
    @Args('answerQuestionHubQuestionInput')
    answerQuestionHubQuestionInput: AnswerQuestionHubQuestionInput,
    @GetUser() user: RequestUser
  ) {
    return this.questionHubService.answerQuestion(
      answerQuestionHubQuestionInput,
      user
    );
  }

  @Roles(UserRole.INSTRUCTOR)
  @Mutation(() => QuestionHubAnswer, {
    description: 'updates question hub answer body.',
  })
  updateQuestionHubAnswer(
    @Args('updateQuestionHubAnswerInput')
    updateQuestionHubAnswerInput: UpdateQuestionHubAnswerInput,
    @GetUser() user: RequestUser
  ) {
    return this.questionHubService.updateAnswer(
      updateQuestionHubAnswerInput.id,
      updateQuestionHubAnswerInput,
      user
    );
  }

  @Mutation(() => QuestionHubQuestion, {
    description: 'updates question hub question body.',
  })
  updateQuestionHubQuestion(
    @Args('updateQuestionHubQuestionInput')
    updateQuestionHubQuestionInput: UpdateQuestionHubQuestionInput,
    @GetUser() user: RequestUser
  ) {
    return this.questionHubService.updateQuestion(
      updateQuestionHubQuestionInput.id,
      updateQuestionHubQuestionInput,
      user
    );
  }

  @Query(() => [QuestionHub], {
    name: 'questionHubsRelated',
    description: 'returns all user related question hubs.',
  })
  findAllUserRelated(@GetUser() user: RequestUser) {
    return this.questionHubService.findAllUserRelated(user);
  }

  @Roles(UserRole.INSTRUCTOR)
  @Query(() => [QuestionHub], {
    name: 'questionHubs',
    description: 'returns all questions hubs.',
  })
  findAll() {
    return this.questionHubService.findAll();
  }

  @Query(() => QuestionHub, {
    name: 'questionHub',
    description: 'returns one question hub.',
  })
  findOne(
    @Args('findOneQuestionHubInput') { id }: FindOneQuestionHubInput,
    @GetUser() user: RequestUser
  ) {
    return this.questionHubService.findOne(id, user);
  }
}
