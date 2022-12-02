import { Mutation, Resolver } from '@nestjs/graphql';

import { QuestionHub } from './entities/question-hub.entity';
import { QuestionHubService } from './question-hub.service';

@Resolver(() => QuestionHub)
export class QuestionHubResolver {
  constructor(private readonly questionHubService: QuestionHubService) {}

  @Mutation(() => QuestionHub)
  createQuestionHubQuestion() {
    return this.questionHubService;
  }
}
