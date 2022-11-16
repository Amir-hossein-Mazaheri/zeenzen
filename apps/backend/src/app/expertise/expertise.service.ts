import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DataSource,
  FindOptionsRelations,
  FindOptionsWhere,
  In,
  Repository,
} from 'typeorm';
import { PrismaService } from '@zeenzen/database';
import { Prisma } from '@prisma/client';

import { CreateExpertiseInput } from './dto/create-expertise.input';
import { UpdateExpertiseInput } from './dto/update-expertise.input';
import { InternalServerErrorException } from '@nestjs/common/exceptions/internal-server-error.exception';
import { Instructor } from '../instructor/entities/instructor.entity';
import { LogsService } from '../logs/logs.service';
import { RequestInstructor } from '../types';
import { toCamelCase } from '../utils/toCamelCase';
import { Expertise } from './entities/expertise.entity';

@Injectable()
export class ExpertiseService {
  private relations: Prisma.ExpertiseInclude = {
    instructor: true,
  };

  constructor(
    @InjectRepository(Expertise)
    private readonly expertiseRepository: Repository<Expertise>,
    @InjectRepository(Instructor)
    private readonly instructorRepository: Repository<Instructor>,
    private readonly dataSource: DataSource,
    private readonly logsService: LogsService,
    private readonly prismaService: PrismaService
  ) {}

  getWhereOptions(id: number, instructorId?: number) {
    const whereOptions: Prisma.ExpertiseWhereInput = { id };

    if (instructorId) {
      whereOptions.instructor = { id: instructorId };
    }

    return whereOptions;
  }

  async validateExpertise(id: number, instructorId?: number) {
    // const expertise = await this.expertiseRepository.findOne({
    //   where: this.getWhereOptions(id, instructorId),
    //   relations: this.relations,
    // })

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
    // return this.instructorRepository.findOneBy({ id });
    return await this.prismaService.instructor.findUnique({ where: { id } });
  }

  async create({ label, level }: CreateExpertiseInput, instructorId: number) {
    // const newExpertise = new Expertise();
    // newExpertise.label = label;
    // newExpertise.level = level;
    // newExpertise.instructor = await this.resolveInstructor(instructorId);

    // await this.expertiseRepository.manager.save(newExpertise);

    // return newExpertise;

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
    // return await this.expertiseRepository.find({ relations: this.relations });
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
    await this.validateExpertise(id, user.instructorId);

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      const expertisesIds = (
        await queryRunner.manager.findOne(Instructor, {
          where: { id: user.instructorId },
          relations: {
            expertises: true,
          },
          select: {
            expertises: {
              id: true,
            },
          },
        })
      ).expertises.map((expertise) => expertise.id);

      await this.dataSource
        .createQueryBuilder()
        .setQueryRunner(queryRunner)
        .update<Expertise>(Expertise)
        .where({ id: In(expertisesIds) })
        .set({ isPrimary: false })
        .execute();

      const expertise = await this.dataSource
        .createQueryBuilder()
        .setQueryRunner(queryRunner)
        .update<Expertise>(Expertise)
        .where({ id })
        .set({ isPrimary: true })
        .returning('*')
        .execute();

      await queryRunner.commitTransaction();

      return toCamelCase(expertise.raw[0]);
    } catch (error) {
      await queryRunner.rollbackTransaction();

      await this.logsService.logError('markExpertiseAsPrimary', error);

      throw new InternalServerErrorException(
        "Something wen't wrong while trying to mark expertise as primary."
      );
    } finally {
      await queryRunner.release();
    }
  }

  async adminValidateExpertise(id: number) {
    await this.validateExpertise(id);

    // const expertise = await this.dataSource
    //   .createQueryBuilder()
    //   .update<Expertise>(Expertise)
    //   .where({ id })
    //   .set({ validated: true })
    //   .returning('*')
    //   .execute();

    // return toCamelCase(expertise.raw[0]);

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

    // await this.dataSource
    //   .createQueryBuilder()
    //   .update(Expertise)
    //   .set({ ...updateExpertiseInput, validated: false })
    //   .where({ id })
    //   .execute();

    // return expertise;

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

    // await this.dataSource
    //   .createQueryBuilder()
    //   .delete()
    //   .from(Expertise)
    //   .where({ id })
    //   .execute();

    // return expertise;

    return await this.prismaService.expertise.delete({
      where: { id },
    });
  }
}
