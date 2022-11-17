import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '@zeenzen/database';

import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';
import { Comment } from './entities/comment.entity';
import { CourseModule } from '../course/course.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    // TypeOrmModule.forFeature([Comment]),
    CourseModule,
    UserModule,
    DatabaseModule,
  ],
  providers: [CommentResolver, CommentService],
})
export class CommentModule {}
