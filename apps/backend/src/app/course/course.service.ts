import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DataSource,
  FindOptionsWhere,
  In,
  QueryRunner,
  Repository,
} from 'typeorm';
import { PrismaService } from '@zeenzen/database';

import { CreateCourseInput } from './dto/create-course.input';
import { UpdateCourseInput } from './dto/update-course.input';
import { Course } from './entities/course.entity';
import { PaginatedCoursesFilterInput } from './dto/paginated-courses-filter.input';
import { Category } from '../category/entities/category.entity';
import { Instructor } from '../instructor/entities/instructor.entity';
import { PreRequirement } from '../pre-requirement/entities/pre-requirement.entity';
import { Section } from '../section/entities/section.entity';
import { CourseGatheredData, UserRole, MixedKeyValue } from '../types';
import { CourseImage } from '../uploads/entities/course-image.entity';
import { purifiedTurndown } from '../utils/purifiedTurndown';
import { toCamelCase } from '../utils/toCamelCase';
import { Prisma } from '@prisma/client';
import { text } from 'stream/consumers';

const COURSE_PER_PAGE = 6;

@Injectable()
export class CourseService {
  private relations = ['categories', 'image'];

  constructor(
    @InjectRepository(Course) private courseRepository: Repository<Course>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Instructor)
    private instructorRepository: Repository<Instructor>,
    @InjectRepository(Section) private sectionRepository: Repository<Section>,
    @InjectRepository(PreRequirement)
    private preRequirementRepository: Repository<PreRequirement>,
    private dataSource: DataSource,
    private readonly prismaService: PrismaService
  ) {}

  private async gatherRelatedData(
    categoriesId: number[],
    preRequirementsId: number[],
    instructorsId: number[],
    sectionsId: number[]
  ): Promise<CourseGatheredData> {
    const categories = await this.categoryRepository.find({
      where: { id: In<number>(categoriesId) },
    });
    const preRequirements = await this.preRequirementRepository.find({
      where: { id: In<number>(preRequirementsId) },
    });
    const instructors = await this.instructorRepository.find({
      where: { id: In<number>(instructorsId) },
    });
    const sections = await this.sectionRepository.find({
      where: { id: In<number>(sectionsId) },
    });

    return [categories, preRequirements, instructors, sections];
  }

  private async validateGatheredDate(
    categoriesId: number[],
    preRequirementsId: number[],
    instructorsId: number[],
    sectionsId: number[]
  ) {
    const gatheredData = await this.gatherRelatedData(
      categoriesId,
      preRequirementsId,
      instructorsId,
      sectionsId
    );

    if (!gatheredData.every((d) => d.length !== 0)) {
      throw new NotFoundException('One or more of ids list is not valid.');
    }

    return gatheredData;
  }

  // validateInstructor(course: Course, userRole: UserRole, instructorId: number) {
  //   if (this.passOnAdmin(userRole)) {
  //     return true;
  //   }

  //   if (
  //     !course.instructors.some((instructor) => instructor.id === instructorId)
  //   ) {
  //     throw new NotFoundException("You can't modify this pre requirement.");
  //   }
  // }

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
      // whereOptions.instructors = { id: instructorId };

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
    return (whereOptions?: FindOptionsWhere<Course>) =>
      async (transaction?: Prisma.TransactionClient) => {
        // const findOptions = {
        //   where: {
        //     ...this.getWhereOptions(
        //       id,
        //       withDraft,
        //       userRole,
        //       checkInstructor,
        //       instructorId
        //     ),
        //     ...whereOptions,
        //   },
        //   relations: this.relations,
        //   withDeleted,
        // };

        const findOptions: Prisma.CourseFindFirstArgs = {
          where: {
            ...this.getWhereOptions(
              id,
              withDeleted,
              userRole,
              checkInstructor,
              instructorId
            ),
          },
          include: {
            categories: true,
            image: true,
          },
          // TODO: add with deleted
        };

        let course: Prisma.CourseGetPayload<unknown>;

        if (transaction) {
          // course = await queryRunner.manager.findOne(Course, findOptions);
          course = await transaction.course.findFirst(findOptions);
        } else {
          // course = await this.courseRepository.findOne(findOptions);
          course = await this.prismaService.course.findFirst(findOptions);
        }

        if (!course) {
          throw new NotFoundException('Invalid course id.');
        }

        return course;
      };
  }

  async getInstructors(courseId: number) {
    // return await this.instructorRepository.findBy({
    //   courses: { id: courseId },
    // });
    return await this.prismaService.instructor.findFirst({
      where: {
        courses: {
          every: {
            id: courseId,
          },
        },
      },
    });
  }

  async getImage(courseId: number) {
    // return await this.dataSource
    //   .getRepository(CourseImage)
    //   .findOneBy({ course: { id: courseId } });

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
    // const [categories, preRequirements, instructors, sections] =
    //   await this.validateGatheredDate(
    //     categoriesId,
    //     preRequirementsId,
    //     instructorsId,
    //     sectionsId
    //   );

    // const newCourse = new Course();
    // newCourse.spotPlayerCourseId = spotPlayerCourseId;
    // newCourse.title = title;
    // newCourse.shortDescription = shortDescription;
    // newCourse.description = purifiedTurndown(description);
    // newCourse.progress = progress;

    // newCourse.categories = categories;
    // newCourse.preRequirements = preRequirements;
    // newCourse.instructors = instructors;
    // newCourse.sections = sections;

    // if (preRequirementsDescription) {
    //   newCourse.preRequirementsDescription = purifiedTurndown(
    //     preRequirementsDescription
    //   );
    // }

    // if (price) {
    //   newCourse.price = price;
    // }

    // if (level) {
    //   newCourse.level = level;
    // }

    // if (discountPercent) {
    //   newCourse.discountPercent = discountPercent;
    // }

    // await this.courseRepository.manager.save(newCourse);

    // return newCourse;

    const createCourseData: Prisma.CourseCreateInput = {
      title,
      description: purifiedTurndown(description),
      shortDescription,
      progress,
      spotPlayerCourseId,
      // TODO: fix these ids, make them accept array of ids
      categories: {
        connect: {
          id: Math.random(),
        },
      },
      instructors: {
        connect: {
          id: Math.random(),
        },
      },
      preRequirements: {
        connect: {
          id: Math.random(),
        },
      },
      sections: {
        connect: {
          id: Math.random(),
        },
      },
    };

    if (preRequirementsDescription) {
      createCourseData.preRequirementsDescription = preRequirementsDescription;
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

    return await this.prismaService.course.create({
      data: createCourseData,
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

    // const course = await this.dataSource
    //   .createQueryBuilder()
    //   .update<Course>(Course)
    //   .set({ isDraft: false })
    //   .where({ id })
    //   .returning('*')
    //   .execute();

    // return toCamelCase(course.raw[0]);

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
  async findAll({ page, levels, categories }: PaginatedCoursesFilterInput) {
    const whereOptions: FindOptionsWhere<Course> = { isDraft: false };

    if (levels && levels.length > 0) {
      whereOptions.level = In(levels);
    }

    if (categories && categories.length > 0) {
      whereOptions.categories = { id: In(categories) };
    }

    const coursesCount = await this.courseRepository.countBy(whereOptions);

    const courses = await this.courseRepository.find({
      where: whereOptions,
      take: COURSE_PER_PAGE,
      skip: (page - 1) * COURSE_PER_PAGE,
      relations: this.relations,
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
    return await this.validateCourse(id)()();
  }

  async instructorCourses(instructorId: number, userRole: UserRole) {
    const whereOption: MixedKeyValue = {};

    if (!this.passOnAdmin(userRole)) {
      whereOption.instructors = { id: instructorId };
    }

    return await this.courseRepository.find({
      where: {
        isDraft: true,
        ...whereOption,
      },
      relations: this.relations,
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
    )(!this.passOnAdmin(userRole) && { instructors: { id: instructorId } })();
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

    // const course = await this.dataSource
    //   .createQueryBuilder()
    //   .update<Course>(Course)
    //   .set(updateCourseInput)
    //   .where({ id })
    //   .returning('*')
    //   .execute();

    // return toCamelCase(course.raw[0]);

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

    // await this.courseRepository
    //   .createQueryBuilder()
    //   .softDelete()
    //   .where({ id })
    //   .execute();

    // return course;

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

    await this.courseRepository
      .createQueryBuilder()
      .restore()
      .where({ id })
      .execute();

    return course;
  }
}
