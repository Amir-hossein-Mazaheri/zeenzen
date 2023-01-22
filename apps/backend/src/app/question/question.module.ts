import { Module } from '@nestjs/common';
import { DatabaseModule } from '@zeenzen/database';

import { QuestionService } from './question.service';
import { QuestionResolver } from './question.resolver';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule, DatabaseModule],
  providers: [QuestionService, QuestionResolver],
})
export class QuestionModule {}
