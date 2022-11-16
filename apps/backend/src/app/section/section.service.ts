import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@zeenzen/database';
import { DataSource, Repository } from 'typeorm';

import { MixedKeyValue } from '../types';
import { purifiedTurndown } from '../utils/purifiedTurndown';
import { toCamelCase } from '../utils/toCamelCase';
import { CreateSectionInput } from './dto/create-section.input';
import { FindAllSectionInput } from './dto/find-all-section.input';
import { UpdateSectionInput } from './dto/update-section.input';
import { Section } from './entities/section.entity';

@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(Section) private sectionRepository: Repository<Section>,
    private dataSource: DataSource,
    private readonly prismaService: PrismaService
  ) {}

  private async validateInstructor(section: Section, instructorId: number) {
    if (
      !section.course.instructors.some(
        (instructor) => instructor.id === instructorId
      )
    ) {
      throw new BadRequestException("You can't modify this pre requirement.");
    }
  }

  async validateSection(
    id: number,
    checkInstructor = false,
    instructorId?: number,
    withDeleted = false
  ) {
    // const section = await this.sectionRepository.findOne({
    //   where: { id },
    //   relations: {
    //     course: {
    //       instructors: checkInstructor,
    //     },
    //   },
    //   withDeleted,
    // });

    // if (checkInstructor) {
    //   this.validateInstructor(section, instructorId);
    // }

    // TODO: add withDeleted
    const section = await this.prismaService.section.findUnique({
      where: { id },
      include: {
        course: {
          include: {
            instructors: true,
          },
        },
      },
    });

    if (!section) {
      throw new BadRequestException('Invalid section id.');
    }

    return section;
  }

  async create({ label, description, duration }: CreateSectionInput) {
    // const newSection = new Section();
    // newSection.label = label;
    // newSection.description = purifiedTurndown(description);
    // if (duration) {
    //   newSection.duration = duration;
    // }

    // await this.sectionRepository.manager.save(newSection);

    // return newSection;

    return await this.prismaService.section.create({
      data: {
        label,
        description: purifiedTurndown(description),
        duration,
      },
    });
  }

  async findAll({ courseId }: FindAllSectionInput) {
    // const options: MixedKeyValue = {
    //   relations: ['course'],
    // };

    // if (courseId) {
    //   options.where = { course: { id: courseId } };
    // }

    // return await this.sectionRepository.find(options);

    const whereOptions: Prisma.SectionWhereInput = {};

    if (courseId) {
      whereOptions.course.id = courseId;
    }

    return await this.prismaService.section.findMany({
      where: whereOptions,
    });
  }

  async findOne(id: number) {
    return await this.validateSection(id);
  }

  async update(
    id: number,
    updateSectionInput: UpdateSectionInput,
    instructorId: number
  ) {
    await this.validateSection(id, true, instructorId);

    if (updateSectionInput.description) {
      updateSectionInput.description = purifiedTurndown(
        updateSectionInput.description
      );
    }

    // const section = await this.dataSource
    //   .createQueryBuilder()
    //   .update(Section)
    //   .set(updateSectionInput)
    //   .where({ id })
    //   .returning('*')
    //   .execute();

    // return toCamelCase(section.raw[0]);

    return await this.prismaService.section.update({
      where: {
        id,
      },
      data: updateSectionInput,
    });
  }

  async remove(id: number, instructorId: number) {
    await this.validateSection(id, true, instructorId);

    // await this.sectionRepository
    //   .createQueryBuilder()
    //   .softDelete()
    //   .where({ id })
    //   .execute();

    // return section;

    // TODO: fix soft delete
    return await this.prismaService.section.delete({
      where: {
        id,
      },
    });
  }

  // TODO: replace with prisma restore
  async restore(id: number, instructorId: number) {
    const section = await this.validateSection(id, true, instructorId, true);

    await this.sectionRepository
      .createQueryBuilder()
      .restore()
      .where({ id })
      .execute();

    return section;
  }
}
