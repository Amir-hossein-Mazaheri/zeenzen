import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, FindOptionsRelations, IsNull, Repository } from 'typeorm';
import { PrismaService } from '@zeenzen/database';

import { CreateInstructorInput } from './dto/create-instructor.input';
import { UpdateInstructorInput } from './dto/update-instructor.input';
import { Instructor } from './entities/instructor.entity';
import { InternalServerErrorException } from '@nestjs/common/exceptions';
import { Expertise } from '../expertise/entities/expertise.entity';
import { LogsService } from '../logs/logs.service';
import { UserRole } from '../types';
import { User } from '../user/entities/user.entity';

@Injectable()
export class InstructorService {
  // private instructorRelations: FindOptionsRelations<Instructor> = {
  //   expertises: true,
  //   socials: true,
  //   courses: true,
  // };

  constructor(
    @InjectRepository(Instructor)
    private instructorRepository: Repository<Instructor>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private dataSource: DataSource,
    private logsService: LogsService,
    private readonly prismaService: PrismaService
  ) {}

  async validateInstructor(id: number) {
    // const instructor = await this.instructorRepository.findOne({
    //   where: { id },
    //   relations: this.instructorRelations,
    // });

    const instructor = await this.prismaService.instructor.findUnique({
      where: { id },
      include: {
        expertise: true,
        social: true,
        // TODO: add courses after fixation of prisma schema
      },
    });

    if (!instructor) {
      throw new BadRequestException('Invalid instructor id.');
    }

    return instructor;
  }

  async getUser(instructorId: number) {
    // return this.userRepository.findOneBy({ instructor: { id: instructorId } });
    return await this.prismaService.user.findFirst({
      where: {
        instructor: {
          id: instructorId,
        },
      },
    });
  }

  async getExpertises(instructorId: number) {
    // return await this.dataSource
    //   .getRepository(Expertise)
    //   .findBy({ instructor: { id: instructorId } });

    return await this.prismaService.expertise.findFirst({
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

    // const queryRunner = this.dataSource.createQueryRunner();

    // const user = await this.userRepository.findOneBy({
    //   id: userId,
    //   instructor: IsNull(),
    // });

    // if (!user) {
    //   throw new BadRequestException(
    //     'User id is wrong or user is already is an instructor.'
    //   );
    // }

    // await queryRunner.connect();
    // await queryRunner.startTransaction();

    // try {
    //   const newInstructor = new Instructor();
    //   newInstructor.about = about;
    //   newInstructor.user = user;

    //   await queryRunner.manager.save(newInstructor);

    //   // modifies user object
    //   user.role = UserRole.INSTRUCTOR;

    //   // after instructor is created updates user role into instructor
    //   // saves modified user object
    //   await queryRunner.manager.save(user);

    //   // submit all changes into database
    //   await queryRunner.commitTransaction();

    //   return newInstructor;
    // } catch (err) {
    //   await queryRunner.rollbackTransaction();

    //   await this.logsService.logError('create instructor', err);

    //   throw new InternalServerErrorException(
    //     'Something went wrong while trying to create instructor.'
    //   );
    // } finally {
    //   await queryRunner.release();
    // }
  }

  async findAll() {
    // return await this.instructorRepository.find({
    //   relations: this.instructorRelations,
    // });

    return await this.prismaService.instructor.findMany({
      include: {
        expertise: true,
        social: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.validateInstructor(id);
  }

  async update(id: number, updateInstructorInput: UpdateInstructorInput) {
    await this.validateInstructor(id);

    // await this.dataSource
    //   .createQueryBuilder()
    //   .update(Instructor)
    //   .set(updateInstructorInput)
    //   .where({ id })
    //   .execute();

    // return instructor;

    return await this.prismaService.instructor.update({
      where: {
        id,
      },
      data: updateInstructorInput,
    });
  }
}
