import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, Avatar } from '@prisma/client';
import { PrismaService } from '@zeenzen/database';

import { Request } from 'express';
import * as fs from 'fs/promises';
import { CourseService } from '../course/course.service';
import { LogsService } from '../logs/logs.service';
import { RequestUser, CourseImagesFiles, TFile } from '../types';
import { UserService } from '../user/user.service';
import getUploadsPath from '../utils/getUploadsPath';
import { getUrl } from '../utils/getUrl';

export const COURSES_UPLOAD_DIR = 'courses';

export const USERS_AVATAR_UPLOAD_DIR = 'users/avatar';

let IS_CONFIRMED = false;

@Injectable()
export class UploadsService {
  constructor(
    // private readonly dataSource: DataSource,
    private readonly userService: UserService,
    private readonly courseService: CourseService,
    private readonly logsService: LogsService,
    private readonly prismaService: PrismaService
  ) {}

  async validateAvatar(
    id: string,
    user: RequestUser,
    transaction: Prisma.TransactionClient
  ) {
    // const avatar = await queryRunner.manager.findOne(Avatar, {
    //   where: { id, user: { id: user.sub } },
    // });

    const avatar = await transaction.avatar.findFirst({
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

  async validateCourseImage(id: string, transaction: Prisma.TransactionClient) {
    // const courseImage = await queryRunner.manager.findOneBy(CourseImage, {
    //   id,
    // });

    const courseImage = await transaction.courseImage.findUnique({
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
    return await this.prismaService.$transaction(async (tx) => {
      const course = await tx.course.findFirst({
        include: {
          image: true,
        },
      });

      if (course.image) {
        await this.transactionalRemoveCourseImage(course.image.id, tx);
      }

      const courseImagePath = `/uploads/${COURSES_UPLOAD_DIR}/${courseImage.filename}`;
      const courseImageAbsolutePath = getUrl(req) + courseImagePath;

      const courseCoverPath = `/uploads/${COURSES_UPLOAD_DIR}/${courseCover.filename}`;
      const courseCoverAbsolutePath = getUrl(req) + courseCoverPath;

      await tx.courseImage.upsert({
        create: {
          image: courseImageAbsolutePath,
          course: {
            connect: course,
          },
          coverImage: courseCoverAbsolutePath,
        },
        update: {
          image: courseImageAbsolutePath,
          course: {
            connect: course,
          },
          coverImage: courseCoverAbsolutePath,
        },
        where: {
          id: course.image.id,
        },
      });

      return {
        courseImage: this.getUploadResponse(
          courseImage.originalname,
          courseImage.filename,
          courseImagePath,
          courseImageAbsolutePath
        ),
        courseCover: this.getUploadResponse(
          courseCover.originalname,
          courseCover.filename,
          courseCoverPath,
          courseCoverAbsolutePath
        ),
      };
    });
  }

  async uploadUserAvatar(
    req: Request,
    { filename, originalname }: TFile,
    user: RequestUser
  ) {
    // TODO: adds catch part
    return await this.prismaService.$transaction(async (tx) => {
      const currUser = await this.userService.validateUser(
        user.sub,
        false,
        true,
        tx
      );

      let previousAvatarFileName: string;

      if (currUser.avatar) {
        previousAvatarFileName = currUser.avatar.name;
      }

      const path = `/uploads/${USERS_AVATAR_UPLOAD_DIR}/${filename}`;
      const absolutePath = getUrl(req) + path;

      const upsertData: Prisma.AvatarCreateArgs['data'] = {
        fullPath: absolutePath,
        originalName: originalname,
        name: filename,

        user: {
          connect: {
            id: currUser.id,
          },
        },
      };

      let avatar: Avatar;

      if (currUser.avatar) {
        const { user: _, ...updateData } = upsertData;

        avatar = await tx.avatar.update({
          data: updateData,
          where: {
            id: currUser.avatar.id,
          },
        });
      } else {
        avatar = await tx.avatar.create({
          data: upsertData,
        });
      }

      if (previousAvatarFileName) {
        await this.removeUserAvatarFile(previousAvatarFileName);
      }

      return {
        ...this.getUploadResponse(originalname, filename, path, absolutePath),
        avatarId: avatar.id,
      };
    });
  }

  async transactionalRemoveCourseImage(
    courseImageId: string,
    transaction: Prisma.TransactionClient
  ) {
    const courseImage = await this.validateCourseImage(
      courseImageId,
      transaction
    );

    await transaction.courseImage.delete({
      where: {
        id: courseImage.id,
      },
    });

    await this.removeCourseImageFiles(
      this.getFilenameFromUrl(courseImage.image),
      this.getFilenameFromUrl(courseImage.coverImage)
    );
  }

  async removeCourseImage(id: string) {
    const validation = this.validationConfirmation(id);

    if (typeof validation === 'object') {
      return validation;
    }

    return await this.prismaService.$transaction(async (tx) => {
      await this.transactionalRemoveCourseImage(id, tx);

      IS_CONFIRMED = false;

      return {
        message: 'Course image successfully deleted.',
      };
    });
  }

  async removeUserAvatarFile(filename: string) {
    await fs.unlink(getUploadsPath(USERS_AVATAR_UPLOAD_DIR, filename));
  }

  async transactionalRemoveUserAvatar(
    id: string,
    user: RequestUser,
    transaction: Prisma.TransactionClient
  ) {
    const avatar = await this.validateAvatar(id, user, transaction);

    await transaction.avatar.delete({
      where: {
        id: avatar.id,
      },
    });

    await this.removeUserAvatarFile(avatar.name);
  }

  async removeUserAvatar(id: string, user: RequestUser) {
    await this.prismaService.$transaction(async (tx) => {
      await this.transactionalRemoveUserAvatar(id, user, tx);
    });
  }
}
