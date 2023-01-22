import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@zeenzen/database';

import { CreateInstructorInput } from './dto/create-instructor.input';
import { UpdateInstructorInput } from './dto/update-instructor.input';
import { LogsService } from '../logs/logs.service';
import { UserRole } from '../types';

@Injectable()
export class InstructorService {
  constructor(
    private logsService: LogsService,
    private readonly prismaService: PrismaService
  ) {}

  async validateInstructor(id: number) {
    const instructor = await this.prismaService.instructor.findUnique({
      where: { id },
      include: {
        expertises: true,
        socials: true,
        courses: true,
      },
    });

    if (!instructor) {
      throw new BadRequestException('Invalid instructor id.');
    }

    return instructor;
  }

  async getUser(instructorId: number) {
    return await this.prismaService.user.findFirst({
      where: {
        instructor: {
          id: instructorId,
        },
      },
    });
  }

  async getExpertises(instructorId: number) {
    return await this.prismaService.expertise.findMany({
      where: {
        instructor: {
          id: instructorId,
        },
      },
    });
  }

  async create({ about, userId }: CreateInstructorInput) {
    return await this.prismaService.$transaction(async (tx) => {
      const user = await tx.user.findFirst({
        where: {
          id: userId,
          instructor: {
            NOT: null,
          },
        },
      });

      if (!user) {
        throw new BadRequestException(
          'User id is wrong or user is already is an instructor.'
        );
      }

      const instructor = await tx.instructor.create({
        data: {
          about,
          user: {
            connect: { id: user.id },
          },
        },
      });

      await tx.user.update({
        where: {
          id: user.id,
        },
        data: {
          ...user,
          role: UserRole.INSTRUCTOR,
        },
      });

      return instructor;
    });
  }

  async findAll() {
    return await this.prismaService.instructor.findMany({
      include: {
        expertises: true,
        socials: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.validateInstructor(id);
  }

  async update(id: number, updateInstructorInput: UpdateInstructorInput) {
    await this.validateInstructor(id);

    return await this.prismaService.instructor.update({
      where: {
        id,
      },
      data: updateInstructorInput,
    });
  }
}
