import { Module } from '@nestjs/common';
import { DatabaseModule } from '@zeenzen/database';

import { QuestionHubResolver } from './question-hub.resolver';
import { QuestionHubService } from './question-hub.service';

@Module({
  imports: [DatabaseModule],
  providers: [QuestionHubResolver, QuestionHubService],
})
export class QuestionHubModule {}
