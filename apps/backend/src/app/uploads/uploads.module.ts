import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from '@zeenzen/database';

import { UploadsService } from './uploads.service';
import { UploadsController } from './uploads.controller';
import { ImageValidationPipe } from './pipes/image.pipe';
import { CourseModule } from '../course/course.module';
import { UserModule } from '../user/user.module';

@Global()
@Module({
  imports: [UserModule, CourseModule, DatabaseModule],
  controllers: [UploadsController],
  providers: [UploadsService, ImageValidationPipe],
  exports: [UploadsService],
})
export class UploadsModule {}
