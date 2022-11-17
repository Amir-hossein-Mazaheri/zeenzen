import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '@zeenzen/database';

import { QuestionService } from './question.service';
import { QuestionResolver } from './question.resolver';
import { Question } from './entities/question.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    // TypeOrmModule.forFeature([Question]),
    UserModule,
    DatabaseModule,
  ],
  providers: [QuestionService, QuestionResolver],
})
export class QuestionModule {}
