import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@zeenzen/database';

import { CreateCourseInput } from './dto/create-course.input';
import { UpdateCourseInput } from './dto/update-course.input';
import { PaginatedCoursesFilterInput } from './dto/paginated-courses-filter.input';
import { RequestUser, UserRole } from '../types';
import { purifiedTurndown } from '../utils/purifiedTurndown';
import { Prisma } from '@prisma/client';

const COURSE_PER_PAGE = 6;

@Injectable()
export class CourseService {
  constructor(private readonly prismaService: PrismaService) {}

  passOnAdmin(userRole: UserRole) {
    if (userRole === UserRole.ADMIN) {
      return true;
    }
  }

  getWhereOptions(
    id: number,
    isDraft: boolean,
    userRole: UserRole,
    checkInstructor: boolean,
    instructorId?: number
  ) {
    const whereOptions: Prisma.CourseWhereInput = { id, isDraft };

    if (!this.passOnAdmin(userRole) && checkInstructor) {
      whereOptions.instructors = {
        // TODO: it must be ok but check 'every' functionality
        every: {
          id: instructorId,
        },
      };
    }

    return whereOptions;
  }

  validateCourse(
    id: number,
    checkInstructor = false,
    instructorId?: number,
    withDeleted = false,
    userRole?: UserRole,
    withDraft = false
  ) {
    return (whereOptions?: Prisma.CourseFindFirstArgs['where']) =>
      async (transaction?: Prisma.TransactionClient) => {
        const findOptions: Prisma.CourseFindFirstArgs = {
          where: {
            ...this.getWhereOptions(
              id,
              withDeleted,
              userRole,
              checkInstructor,
              instructorId
            ),
            ...whereOptions,
          },
          include: {
            categories: true,
            image: true,
          },
          // TODO: add with deleted
        };

        let course: Prisma.CourseGetPayload<unknown>;

        if (transaction) {
          course = await transaction.course.findFirst(findOptions);
        } else {
          course = await this.prismaService.course.findFirst(findOptions);
        }

        if (!course) {
          throw new NotFoundException('Invalid course id.');
        }

        return course;
      };
  }

  async getInstructors(courseId: number) {
    console.log('get instructor course id: ', courseId);

    const instructors = await this.prismaService.instructor.findMany({
      where: {
        courses: {
          some: {
            id: courseId,
          },
        },
      },
    });

    console.log('instructors', instructors);

    return instructors;
  }

  async getImage(courseId: number) {
    return await this.prismaService.courseImage.findFirst({
      where: {
        course: {
          id: courseId,
        },
      },
    });
  }

  async create({
    spotPlayerCourseId,
    title,
    shortDescription,
    preRequirementsDescription,
    description,
    level,
    price,
    progress,
    categoriesId,
    preRequirementsId,
    instructorsId,
    sectionsId,
    discountPercent,
  }: CreateCourseInput) {
    // TODO: instead of creating course with pre created categories, instructors, and etc, make it create them here
    return await this.prismaService.$transaction(async (tx) => {
      const createCourseData: Prisma.CourseCreateInput = {
        title,
        description: purifiedTurndown(description),
        shortDescription,
        progress,
        spotPlayerCourseId,

        questionHub: {
          create: {},
        },

        categories: {
          connect: await tx.category.findMany({
            where: {
              id: {
                in: categoriesId,
              },
            },
          }),
        },

        instructors: {
          connect: await tx.instructor.findMany({
            where: {
              id: {
                in: instructorsId,
              },
            },
          }),
        },

        preRequirements: {
          connect: await tx.preRequirement.findMany({
            where: {
              id: {
                in: preRequirementsId,
              },
            },
          }),
        },

        sections: {
          connect: await tx.section.findMany({
            where: {
              id: {
                in: sectionsId,
              },
            },
          }),
        },
      };

      if (preRequirementsDescription) {
        createCourseData.preRequirementsDescription =
          preRequirementsDescription;
      }

      if (price) {
        createCourseData.price = price;
      }

      if (level) {
        createCourseData.level = level;
      }

      if (discountPercent) {
        createCourseData.discountPercent = discountPercent;
      }

      return await tx.course.create({
        data: createCourseData,
      });
    });
  }

  async publish(id: number) {
    const randomNumber = Math.random();
    await this.validateCourse(
      id,
      false,
      randomNumber,
      false,
      UserRole.ADMIN,
      true
    )()();

    return await this.prismaService.course.update({
      where: {
        id,
      },
      data: {
        isDraft: false,
      },
    });
  }

  // we shouldn't load all relations
  // because its a huge load for back-end
  // and also front end
  // each other parts should be called separately
  async findAll(
    { page, levels, categories }: PaginatedCoursesFilterInput,
    user?: RequestUser
  ) {
    const whereOption: Prisma.CourseWhereInput = { isDraft: false };

    if (levels && levels.length > 0) {
      whereOption.level = {
        in: levels,
      };
    }

    if (categories && categories.length > 0) {
      whereOption.categories = {
        every: {
          id: {
            in: categories,
          },
        },
      };
    }

    if (user?.role !== UserRole.ADMIN) {
      whereOption.deletedAt = null;
    }

    const coursesCount = await this.prismaService.course.count();

    const courses = await this.prismaService.course.findMany({
      where: whereOption,
      take: COURSE_PER_PAGE,
      skip: (page - 1) * COURSE_PER_PAGE,
      include: {
        categories: true,
        image: true,
      },
    });

    const totalPages = Math.ceil(coursesCount / COURSE_PER_PAGE);

    const hasNext = page < totalPages;

    const hasPrev = page !== 1;

    return {
      page,
      totalPages,
      hasNext,
      hasPrev,
      courses,
    };
  }

  async findOne(id: number) {
    const course = await this.validateCourse(id)()();

    console.log('find one course: ', course);

    return course;
  }

  async instructorCourses(instructorId: number, userRole: UserRole) {
    const whereOption: Prisma.CourseWhereInput = {
      isDraft: true,
    };

    if (!this.passOnAdmin(userRole)) {
      whereOption.instructors = {
        some: {
          id: instructorId,
        },
      };
    }

    return await this.prismaService.course.findMany({
      where: whereOption,
      include: {
        categories: true,
        image: true,
      },
    });
  }

  async instructorCourse(id: number, instructorId: number, userRole: UserRole) {
    // it will return one of instructor's draft course
    // if user is admin, he/she can access all draft courses
    return await this.validateCourse(
      id,
      true,
      instructorId,
      false,
      userRole,
      true
    )(
      !this.passOnAdmin(userRole) && {
        instructors: { some: { id: instructorId } },
      }
    )();
  }

  async update(
    id: number,
    updateCourseInput: UpdateCourseInput,
    userRole: UserRole,
    instructorId: number
  ) {
    await this.validateCourse(
      id,
      true,
      instructorId,
      false,
      userRole,
      true
    )()();

    if (updateCourseInput.description) {
      updateCourseInput.description = purifiedTurndown(
        updateCourseInput.description
      );
    }

    return await this.prismaService.course.update({
      where: {
        id,
      },
      data: updateCourseInput,
    });
  }

  async remove(id: number) {
    const randomNumber = Math.random();
    await this.validateCourse(id, false, randomNumber)()();

    // TODO: change it to soft delete
    return await this.prismaService.course.delete({
      where: {
        id,
      },
    });
  }

  // TODO: replace with prisma
  async restore(id: number) {
    const randomNumber = Math.random();
    const course = await this.validateCourse(id, false, randomNumber, true)()();
  }
}
