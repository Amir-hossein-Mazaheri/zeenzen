import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@zeenzen/database';

import { purifiedTurndown } from '../utils/purifiedTurndown';
import { CreatePreRequirementInput } from './dto/create-pre-requirement.input';
import { UpdatePreRequirementInput } from './dto/update-pre-requirement.input';
import { PreRequirement } from './entities/pre-requirement.entity';

@Injectable()
export class PreRequirementService {
  constructor(private readonly prismaService: PrismaService) {}

  private async validateInstructor(
    preRequirement: PreRequirement,
    instructorId: number
  ) {
    if (
      !preRequirement.course.instructors.some(
        (instructor) => instructor.id === instructorId
      )
    ) {
      throw new BadRequestException("You can't modify this pre requirement.");
    }
  }

  async validatePreRequirement(
    id: number,
    checkInstructor = false,
    instructorId?: number,
    withDeleted = false
  ) {
    // TODO: adds withDeleted
    const preRequirement = await this.prismaService.preRequirement.findUnique({
      where: {
        id,
      },
      include: {
        course: {
          include: {
            instructors: true,
          },
        },
      },
    });

    if (!preRequirement) {
      throw new BadRequestException('Invalid pre requirement id.');
    }

    return preRequirement;
  }

  async create({
    label,
    description,
    level,
    image,
  }: CreatePreRequirementInput) {
    return await this.prismaService.preRequirement.create({
      data: {
        label,
        description: purifiedTurndown(description),
        level,
        image,
      },
    });
  }

  async findAll(id: number) {
    return await this.prismaService.preRequirement.findMany({
      where: {
        course: {
          id,
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.validatePreRequirement(id);
  }

  async update(
    id: number,
    updatePreRequirementInput: UpdatePreRequirementInput,
    instructorId: number
  ) {
    await this.validatePreRequirement(id, true, instructorId);

    if (updatePreRequirementInput.description) {
      updatePreRequirementInput.description = purifiedTurndown(
        updatePreRequirementInput.description
      );
    }

    return await this.prismaService.preRequirement.update({
      where: {
        id,
      },
      data: updatePreRequirementInput,
    });
  }

  async remove(id: number, instructorId: number) {
    await this.validatePreRequirement(id, true, instructorId);

    return await this.prismaService.preRequirement.delete({
      where: {
        id,
      },
    });
  }

  // TODO: replace it with prisma restore
  async restore(id: number, instructorId: number) {
    const preRequirement = await this.validatePreRequirement(
      id,
      true,
      instructorId,
      true
    );
  }
}
