import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@zeenzen/database';

import { Request } from 'express';
import * as fs from 'fs/promises';
import { DataSource, QueryRunner } from 'typeorm';
import { CourseService } from '../course/course.service';
import { LogsService } from '../logs/logs.service';
import { RequestUser, CourseImagesFiles, TFile } from '../types';
import { UserService } from '../user/user.service';
import getUploadsPath from '../utils/getUploadsPath';
import { getUrl } from '../utils/getUrl';
import { Avatar } from './entities/avatar.entity';

import { CourseImage } from './entities/course-image.entity';

export const COURSES_UPLOAD_DIR = 'courses';

export const USERS_AVATAR_UPLOAD_DIR = 'users/avatar';

let IS_CONFIRMED = false;

@Injectable()
export class UploadsService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly logsService: LogsService,
    private readonly userService: UserService,
    private readonly courseService: CourseService,
    private readonly prismaService: PrismaService
  ) {}

  async validateAvatar(id: string, user: RequestUser) {
    // const avatar = await queryRunner.manager.findOne(Avatar, {
    //   where: { id, user: { id: user.sub } },
    // });

    const avatar = await this.prismaService.avatar.findFirst({
      where: {
        id,
        user: { id: user.sub },
      },
    });

    if (!avatar) {
      throw new NotFoundException('Invalid avatar id.');
    }

    return avatar;
  }

  async validateCourseImage(id: string) {
    // const courseImage = await queryRunner.manager.findOneBy(CourseImage, {
    //   id,
    // });

    const courseImage = await this.prismaService.courseImage.findUnique({
      where: { id },
    });

    if (!courseImage) {
      throw new NotFoundException('Invalid course image id.');
    }

    return courseImage;
  }

  getFilenameFromUrl(url: string) {
    const splittedUrl = url.split('/');

    let filename = splittedUrl.at(-1);

    if (!filename || filename === ' ') {
      filename = splittedUrl.at(-2);
    }

    return filename;
  }

  validationConfirmation(id: string) {
    if (!IS_CONFIRMED) {
      IS_CONFIRMED = true;

      return {
        message: `Are you sure you want to delete course image with id:  ${id}?, request again to delete.`,
      };
    }

    return true;
  }

  getUploadResponse(
    originalname: string,
    filename: string,
    path: string,
    absolutePath: string
  ) {
    return {
      message: `File ${originalname} uploaded successfully`,
      name: originalname,
      savedName: filename,
      path,
      absolutePath,
    };
  }

  async removeCourseImageFiles(courseImage: string, courseCover: string) {
    await fs.unlink(getUploadsPath(COURSES_UPLOAD_DIR, courseImage));
    await fs.unlink(getUploadsPath(COURSES_UPLOAD_DIR, courseCover));
  }

  async uploadCourseImage(
    req: Request,
    courseId: number,
    {
      courseImage: [courseImage],
      courseCover: [courseCover],
    }: CourseImagesFiles
  ) {
    await this.prismaService.$transaction(async (tx) => {
      const course = await tx.course.findFirst({
        include: {
          courseImage: true,
        },
      });

      let currCourseImage: CourseImage;

      if (course.courseImage) {
        currCourseImage = await tx.courseImage.findFirst({
          where: {
            id: course.courseImage.id,
          },
        });
      }
    });

    // const queryRunner = this.dataSource.createQueryRunner();

    // await queryRunner.connect();

    // await queryRunner.startTransaction();

    // try {
    //   const course = await this.courseService.validateCourse(courseId)()(
    //     queryRunner
    //   );

    //   let currCourseImage: CourseImage;

    //   if (course.image) {
    //     currCourseImage = await queryRunner.manager.findOneBy(CourseImage, {
    //       id: course.image.id,
    //     });

    //     await this.removeCourseImageWithQueryRunner(
    //       currCourseImage.id,
    //       queryRunner
    //     );
    //   } else {
    //     currCourseImage = new CourseImage();
    //   }

    //   const courseImagePath = `/uploads/${COURSES_UPLOAD_DIR}/${courseImage.filename}`;
    //   const courseImageAbsolutePath = getUrl(req) + courseImagePath;

    //   const courseCoverPath = `/uploads/${COURSES_UPLOAD_DIR}/${courseCover.filename}`;
    //   const courseCoverAbsolutePath = getUrl(req) + courseCoverPath;

    //   currCourseImage.image = courseImageAbsolutePath;
    //   currCourseImage.coverImage = courseCoverAbsolutePath;
    //   currCourseImage.course = course;

    //   await queryRunner.manager.save(currCourseImage);

    //   await queryRunner.commitTransaction();

    //   return {
    //     courseImage: this.getUploadResponse(
    //       courseImage.originalname,
    //       courseImage.filename,
    //       courseImagePath,
    //       courseImageAbsolutePath
    //     ),
    //     courseCover: this.getUploadResponse(
    //       courseCover.originalname,
    //       courseCover.filename,
    //       courseCoverPath,
    //       courseCoverAbsolutePath
    //     ),
    //   };
    // } catch (error) {
    //   await queryRunner.rollbackTransaction();

    //   await this.logsService.logError('', error);

    //   throw new InternalServerErrorException(
    //     "Something wen't wrong while trying to upload course images."
    //   );
    // } finally {
    //   await queryRunner.release();
    // }
  }

  async uploadUserAvatar(
    req: Request,
    { filename, originalname }: TFile,
    user: RequestUser
  ) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      const currUser = await this.userService.validateUser(
        user.sub,
        false,
        true
      );

      let avatar: Avatar;

      console.log(currUser);

      if (currUser.avatar) {
        avatar = await this.validateAvatar(
          currUser.avatar.id,
          user,
          queryRunner
        );

        await this.removeUserAvatarWithQueryRunner(
          avatar.id,
          user,
          queryRunner
        );
      } else {
        avatar = new Avatar();
      }

      const path = `/uploads/${USERS_AVATAR_UPLOAD_DIR}/${filename}`;
      const absolutePath = getUrl(req) + path;

      avatar.fullPath = absolutePath;
      avatar.originalName = originalname;
      avatar.name = filename;
      avatar.user = currUser;

      await queryRunner.manager.save(avatar);

      await queryRunner.commitTransaction();

      return {
        ...this.getUploadResponse(originalname, filename, path, absolutePath),
        avatarId: avatar.id,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();

      await this.logsService.logError('uploadUserAvatar', error);

      throw new InternalServerErrorException(
        "Something wen't wrong while trying to upload your avatar."
      );
    } finally {
      await queryRunner.release();
    }
  }

  async removeCourseImageWithQueryRunner(
    courseImageId: string,
    queryRunner: QueryRunner
  ) {
    const courseImage = await this.validateCourseImage(
      courseImageId,
      queryRunner
    );

    await queryRunner.manager.delete(CourseImage, { id: courseImage.id });

    await this.removeCourseImageFiles(
      this.getFilenameFromUrl(courseImage.image),
      this.getFilenameFromUrl(courseImage.coverImage)
    );
  }

  async removeCourseImage(id: string) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction();

    const validation = this.validationConfirmation(id);

    if (typeof validation === 'object') {
      return validation;
    }

    try {
      await this.removeCourseImageWithQueryRunner(id, queryRunner);

      IS_CONFIRMED = false;

      await queryRunner.commitTransaction();

      return {
        message: 'Course image successfully deleted.',
      };
    } catch (err) {
      await queryRunner.rollbackTransaction();

      const code = err?.code;

      if (code === 'ENOENT') {
        throw new BadRequestException("File doesn't exists.");
      }

      await this.logsService.logError('removeCourseImage', err);

      throw new InternalServerErrorException(
        'Something went wrong while trying to delete file.'
      );
    } finally {
      await queryRunner.release();
    }
  }

  async removeUserAvatarFile(filename: string) {
    await fs.unlink(getUploadsPath(USERS_AVATAR_UPLOAD_DIR, filename));
  }

  async removeUserAvatarWithQueryRunner(
    id: string,
    user: RequestUser,
    queryRunner: QueryRunner
  ) {
    const avatar = await this.validateAvatar(id, user, queryRunner);

    await queryRunner.manager.delete(Avatar, { id: avatar.id });

    await this.removeUserAvatarFile(avatar.name);
  }

  async removeUserAvatar(id: string, user: RequestUser) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      await this.removeUserAvatarWithQueryRunner(id, user, queryRunner);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
