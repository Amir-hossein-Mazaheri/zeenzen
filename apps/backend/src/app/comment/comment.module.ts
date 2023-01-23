import { Module } from '@nestjs/common';
import { DatabaseModule } from '@zeenzen/database';

import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';
import { CourseModule } from '../course/course.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [CourseModule, UserModule, DatabaseModule],
  providers: [CommentResolver, CommentService],
})
export class CommentModule {}
