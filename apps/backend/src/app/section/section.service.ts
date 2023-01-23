import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@zeenzen/database';

import { purifiedTurndown } from '../utils/purifiedTurndown';
import { CreateSectionInput } from './dto/create-section.input';
import { FindAllSectionInput } from './dto/find-all-section.input';
import { UpdateSectionInput } from './dto/update-section.input';

@Injectable()
export class SectionService {
  constructor(private readonly prismaService: PrismaService) {}

  async validateSection(
    id: number,
    checkInstructor = false,
    instructorId?: number,
    withDeleted = false
  ) {
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
    return await this.prismaService.section.create({
      data: {
        label,
        description: purifiedTurndown(description),
        duration,
      },
    });
  }

  async findAll({ courseId }: FindAllSectionInput) {
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

    return await this.prismaService.section.update({
      where: {
        id,
      },
      data: updateSectionInput,
    });
  }

  async remove(id: number, instructorId: number) {
    await this.validateSection(id, true, instructorId);

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

    return section;
  }
}
