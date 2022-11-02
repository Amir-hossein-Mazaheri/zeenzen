import {
  Controller,
  Post,
  UploadedFile,
  Req,
  Delete,
  Param,
  UploadedFiles,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { Request } from 'express';

import { UserRole, CourseImagesFiles, TFile, RequestUser } from '../types';
import { Roles } from '../user/decorators/roles.decorator';
import { GetUser } from '../user/decorators/user.decorator';
import { File } from './decorators/file.decorator';
import {
  COURSES_UPLOAD_DIR,
  UploadsService,
  USERS_AVATAR_UPLOAD_DIR,
} from './uploads.service';

@Roles(UserRole.INSTRUCTOR)
@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('course')
  @File('file', COURSES_UPLOAD_DIR, true, [
    { name: 'courseImage', maxCount: 1 },
    { name: 'courseCover', maxCount: 1 },
  ])
  uploadCourseImage(
    @Req() req: Request,
    @Body('courseId', ParseIntPipe) courseId: number,
    @UploadedFiles()
    files: CourseImagesFiles
  ) {
    return this.uploadsService.uploadCourseImage(req, courseId, files);
  }

  @Roles(UserRole.CUSTOMER)
  @Post('user/avatar')
  @File('avatar', USERS_AVATAR_UPLOAD_DIR)
  uploadUserAvatar(
    @Req() req: Request,
    @UploadedFile() file: TFile,
    @GetUser() user: RequestUser
  ) {
    return this.uploadsService.uploadUserAvatar(req, file, user);
  }

  @Roles(UserRole.CUSTOMER)
  @Delete('user/avatar/:id')
  removeUserAvatar(@Param('id') id: string, @GetUser() user: RequestUser) {
    return this.uploadsService.removeUserAvatar(id, user);
  }

  @Delete('course/:id')
  removeCourseImage(@Param('id') id: string) {
    return this.uploadsService.removeCourseImage(id);
  }
}
