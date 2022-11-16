import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@zeenzen/database';
import { DataSource, Repository } from 'typeorm';

import { Section } from '../section/entities/section.entity';
import { toCamelCase } from '../utils/toCamelCase';
import { CreateLectureInput } from './dto/create-lecture.input';
import { UpdateLectureInput } from './dto/update-lecture.input';
import { Lecture } from './entities/lecture.entity';

@Injectable()
export class LectureService {
  constructor(
    @InjectRepository(Lecture) private lectureRepository: Repository<Lecture>,
    @InjectRepository(Section) private sectionRepository: Repository<Section>,
    private dataSource: DataSource,
    private readonly prismaService: PrismaService
  ) {}

  private async validateInstructor(lecture: Lecture, instructorId: number) {
    if (
      !lecture.section.course.instructors.some(
        (instructor) => instructor.id === instructorId
      )
    ) {
      throw new BadRequestException("You can't modify this pre requirement.");
    }
  }

  async validateLecture(
    id: number,
    checkInstructor = false,
    instructorId?: number,
    withDeleted = false
  ) {
    // this level of nesting relation is okay because this query is not get called very often
    // and its only join when checkInstructor is true
    // const lecture = await this.lectureRepository.findOne({
    //   where: { id },
    //   relations: { section: { course: { instructors: checkInstructor } } },
    //   withDeleted,
    // });

    // if (checkInstructor) {
    //   this.validateInstructor(lecture, instructorId);
    // }

    // TODO: adds instructor check
    const whereOptions: Prisma.LectureWhereUniqueInput = { id };

    // TODO: adds withDeleted after adding soft delete middleware
    const lecture = await this.prismaService.lecture.findUnique({
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
    // const section = await this.sectionRepository.findOneBy({ id: sectionId });

    // const newLecture = new Lecture();
    // newLecture.label = label;
    // newLecture.section = section;
    // if (duration) {
    //   newLecture.duration = duration;
    // }

    // await this.lectureRepository.manager.save(newLecture);

    // return newLecture;

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
    // return await this.lectureRepository.find();
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

    // const lecture = await this.dataSource
    //   .createQueryBuilder()
    //   .update()
    //   .set(updateLectureInput)
    //   .where({ id })
    //   .returning('*')
    //   .execute();

    // return toCamelCase(lecture.raw[0]);

    return await this.prismaService.lecture.update({
      where: {
        id,
      },
      data: updateLectureInput,
    });
  }

  async remove(id: number, instructorId: number) {
    await this.validateLecture(id, true, instructorId);

    // await this.lectureRepository
    //   .createQueryBuilder()
    //   .softDelete()
    //   .where({ id })
    //   .execute();

    // return lecture;

    return await this.prismaService.lecture.delete({
      where: {
        id,
      },
    });
  }

  async restore(id: number, instructorId: number) {
    const lecture = await this.validateLecture(id, true, instructorId, true);

    await this.lectureRepository
      .createQueryBuilder()
      .restore()
      .where({ id })
      .execute();

    return lecture;
  }
}
