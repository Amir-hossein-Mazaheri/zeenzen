import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { GetUser } from '../user/decorators/user.decorator';
import { CreateQuestionHubQuestionInput } from './dto/create-question-hub-question.input';
import { QuestionHub } from './entities/question-hub.entity';
import { QuestionHubService } from './question-hub.service';
import { RequestUser, UserRole } from '../types';
import { QuestionHubQuestion } from './entities/question-hub-question.entity';
import { Roles } from '../user/decorators/roles.decorator';
import { AnswerQuestionHubQuestionInput } from './dto/answer-question-hub-question.input';
import { QuestionHubAnswer } from './entities/question-hub-answer.entity';

@Resolver(() => QuestionHub)
export class QuestionHubResolver {
  constructor(private readonly questionHubService: QuestionHubService) {}

  @Roles(UserRole.CUSTOMER)
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
}
