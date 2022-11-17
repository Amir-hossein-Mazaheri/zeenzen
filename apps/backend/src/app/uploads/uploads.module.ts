import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '@zeenzen/database';

import { UploadsService } from './uploads.service';
import { UploadsController } from './uploads.controller';
import { ImageValidationPipe } from './pipes/image.pipe';
import { CourseImage } from './entities/course-image.entity';
import { Avatar } from './entities/avatar.entity';
import { CourseModule } from '../course/course.module';
import { UserModule } from '../user/user.module';

@Global()
@Module({
  imports: [
    // TypeOrmModule.forFeature([CourseImage, Avatar]),
    UserModule,
    CourseModule,
    DatabaseModule,
  ],
  controllers: [UploadsController],
  providers: [UploadsService, ImageValidationPipe],
  exports: [
    // TypeOrmModule,
    UploadsService,
  ],
})
export class UploadsModule {}
