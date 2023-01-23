import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@zeenzen/database';

import { CreateLectureInput } from './dto/create-lecture.input';
import { UpdateLectureInput } from './dto/update-lecture.input';

@Injectable()
export class LectureService {
  constructor(private readonly prismaService: PrismaService) {}

  async validateLecture(
    id: number,
    checkInstructor = false,
    instructorId?: number,
    withDeleted = false
  ) {
    const whereOptions: Prisma.LectureWhereInput = { id };

    if (checkInstructor) {
      whereOptions.section.course.instructors = {
        some: {
          id: instructorId,
        },
      };
    }

    // TODO: adds withDeleted after adding soft delete middleware
    const lecture = await this.prismaService.lecture.findFirst({
      where: whereOptions,
      include: {
        section: {
          include: {
            course: true,
          },
        },
      },
    });

    if (!lecture) {
      throw new NotFoundException("Couldn't find lecture with this id.");
    }

    return lecture;
  }

  async create({ label, duration, sectionId }: CreateLectureInput) {
    return await this.prismaService.lecture.create({
      data: {
        label,
        duration,
        section: {
          connect: {
            id: sectionId,
          },
        },
      },
    });
  }

  async findAll() {
    return await this.prismaService.lecture.findMany();
  }

  async findOne(id: number) {
    return await this.validateLecture(id);
  }

  async update(
    id: number,
    updateLectureInput: UpdateLectureInput,
    instructorId: number
  ) {
    await this.validateLecture(id, true, instructorId);

    return await this.prismaService.lecture.update({
      where: {
        id,
      },
      data: updateLectureInput,
    });
  }

  async remove(id: number, instructorId: number) {
    await this.validateLecture(id, true, instructorId);

    return await this.prismaService.lecture.delete({
      where: {
        id,
      },
    });
  }

  async restore(id: number, instructorId: number) {
    const lecture = await this.validateLecture(id, true, instructorId, true);
  }
}
