import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { GetUser } from '../user/decorators/user.decorator';
import { CreateQuestionHubQuestionInput } from './dto/create-question-hub-question.input';
import { QuestionHub } from './entities/question-hub.entity';
import { QuestionHubService } from './question-hub.service';
import { RequestUser } from '../types';
import { QuestionHubQuestion } from './entities/question-hub-question.entity';

@Resolver(() => QuestionHub)
export class QuestionHubResolver {
  constructor(private readonly questionHubService: QuestionHubService) {}

  @Mutation(() => QuestionHubQuestion)
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
}
