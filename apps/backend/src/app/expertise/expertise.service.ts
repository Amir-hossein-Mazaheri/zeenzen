import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@zeenzen/database';
import { Prisma } from '@prisma/client';

import { CreateExpertiseInput } from './dto/create-expertise.input';
import { UpdateExpertiseInput } from './dto/update-expertise.input';
import { RequestInstructor } from '../types';

@Injectable()
export class ExpertiseService {
  constructor(private readonly prismaService: PrismaService) {}

  getWhereOptions(id: number, instructorId?: number) {
    const whereOptions: Prisma.ExpertiseWhereInput = { id };

    if (instructorId) {
      whereOptions.instructor = { id: instructorId };
    }

    return whereOptions;
  }

  async validateExpertise(id: number, instructorId?: number) {
    const expertise = await this.prismaService.expertise.findFirst({
      where: this.getWhereOptions(id, instructorId),
      select: {
        instructor: {},
      },
    });

    if (!expertise) {
      throw new NotFoundException('Invalid expertise id.');
    }

    return expertise;
  }

  async resolveInstructor(id: number) {
    return await this.prismaService.instructor.findUnique({ where: { id } });
  }

  async create({ label, level }: CreateExpertiseInput, instructorId: number) {
    return await this.prismaService.expertise.create({
      data: {
        label,
        level,
        instructor: {
          connect: { id: instructorId },
        },
      },
    });
  }

  async findAll() {
    return await this.prismaService.expertise.findMany({
      include: {
        instructor: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.validateExpertise(id);
  }

  async markExpertiseAsPrimary(id: number, user: RequestInstructor) {
    // TODO: add catch part
    return await this.prismaService.$transaction(async (tx) => {
      await tx.expertise.updateMany({
        where: {
          instructor: {
            id: user.instructorId,
          },
        },
        data: {
          isPrimary: false,
        },
      });

      return await tx.expertise.update({
        where: {
          id,
        },
        data: {
          isPrimary: false,
        },
      });
    });
  }

  async adminValidateExpertise(id: number) {
    await this.validateExpertise(id);

    return await this.prismaService.expertise.update({
      where: { id },
      data: {
        validated: true,
      },
    });
  }

  async update(
    id: number,
    instructorId: number,
    updateExpertiseInput: UpdateExpertiseInput
  ) {
    await this.validateExpertise(id, instructorId);

    return await this.prismaService.expertise.update({
      where: { id },
      data: {
        ...updateExpertiseInput,
        validated: false,
      },
    });
  }

  async remove(id: number, instructorId: number) {
    await this.validateExpertise(id, instructorId);

    return await this.prismaService.expertise.delete({
      where: { id },
    });
  }
}
