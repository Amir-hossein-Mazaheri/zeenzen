import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Avatar } from '@prisma/client';
import { PrismaService } from '@zeenzen/database';

import { Request } from 'express';
import * as fs from 'fs/promises';
import { RequestUser, CourseImagesFiles, TFile } from '../types';
import { UserService } from '../user/user.service';
import getUploadsPath from '../utils/getUploadsPath';

export const COURSES_UPLOAD_DIR = 'courses';

export const USERS_AVATAR_UPLOAD_DIR = 'users/avatar';

let IS_CONFIRMED = false;

@Injectable()
export class UploadsService {
  constructor(
    private readonly userService: UserService,
    private readonly prismaService: PrismaService
  ) {}

  async validateAvatar(
    id: string,
    user: RequestUser,
    transaction: Prisma.TransactionClient
  ) {
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

  getUploadResponse(originalname: string, filename: string, path: string) {
    return {
      message: `File ${originalname} uploaded successfully`,
      name: originalname,
      savedName: filename,
      path,
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

      const courseCoverPath = `/uploads/${COURSES_UPLOAD_DIR}/${courseCover.filename}`;

      await tx.courseImage.upsert({
        create: {
          image: courseImagePath,
          course: {
            connect: course,
          },
          coverImage: courseCoverPath,
        },
        update: {
          image: courseImagePath,
          course: {
            connect: course,
          },
          coverImage: courseCoverPath,
        },
        where: {
          id: course.image?.id,
        },
      });

      return {
        courseImage: this.getUploadResponse(
          courseImage.originalname,
          courseImage.filename,
          courseImagePath
        ),
        courseCover: this.getUploadResponse(
          courseCover.originalname,
          courseCover.filename,
          courseCoverPath
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

      const upsertData: Prisma.AvatarCreateArgs['data'] = {
        fullPath: path,
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
        ...this.getUploadResponse(originalname, filename, path),
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
