import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@zeenzen/database';
import { DataSource, Repository } from 'typeorm';

import { Instructor } from '../instructor/entities/instructor.entity';
import { toCamelCase } from '../utils/toCamelCase';
import { CreateSocialInput } from './dto/create-social.input';
import { UpdateSocialInput } from './dto/update-social.input';
import { Social } from './entities/social.entity';

@Injectable()
export class SocialService {
  private relations = ['instructor'];

  constructor(
    @InjectRepository(Social) private socialRepository: Repository<Social>,
    @InjectRepository(Instructor)
    private instructorRepository: Repository<Instructor>,
    private dataSource: DataSource,
    private readonly prismaService: PrismaService
  ) {}

  validateSocial(id: number) {
    // const social = await this.socialRepository.findOne({
    //   where: { id },
    //   relations: this.relations,
    // });

    return async (instructorId?: number) => {
      const whereOptions: Prisma.SocialWhereInput = { id };

      if (instructorId) {
        whereOptions.instructor = {
          id: instructorId,
        };
      }

      const social = await this.prismaService.social.findFirst({
        where: whereOptions,
        include: {
          instructor: true,
        },
      });

      if (!social) {
        throw new BadRequestException('Invalid social id.');
      }

      return social;
    };
  }

  validateInstructor(
    instructorId: number,
    social: Prisma.SocialGetPayload<{
      include: {
        instructor: true;
      };
    }>
  ) {
    if (social.instructor.id !== instructorId) {
      throw new ForbiddenException("You can't modify this social.");
    }
  }

  async create({ link, type }: CreateSocialInput, instructorId: number) {
    // const instructor = await this.instructorRepository.findOneBy({
    //   id: instructorId,
    // });

    // const newSocial = new Social();
    // newSocial.type = type;
    // newSocial.link = link;
    // newSocial.instructor = instructor;

    // await this.socialRepository.manager.save(newSocial);

    // return newSocial;

    return await this.prismaService.social.create({
      data: {
        type,
        link,
        instructor: {
          connect: {
            id: instructorId,
          },
        },
      },
    });
  }

  async findAll() {
    // return await this.socialRepository.find({ relations: this.relations });
    return await this.prismaService.social.findMany({
      include: {
        instructor: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.validateSocial(id);
  }

  async update(
    id: number,
    updateSocialInput: UpdateSocialInput,
    instructorId: number
  ) {
    await this.validateSocial(id)(instructorId);

    // this.validateInstructor(instructorId, social);

    // const updatedSocial = await this.dataSource
    //   .createQueryBuilder()
    //   .update<Social>(Social)
    //   .set(updateSocialInput)
    //   .where({ id })
    //   .returning('*')
    //   .execute();

    // return toCamelCase(updatedSocial.raw[0]);

    return await this.prismaService.social.update({
      where: {
        id,
      },
      data: updateSocialInput,
    });
  }

  async remove(id: number, instructorId: number) {
    await this.validateSocial(id)(instructorId);

    // this.validateInstructor(instructorId, social);

    // await this.dataSource
    //   .createQueryBuilder()
    //   .delete()
    //   .from(Social)
    //   .where({ id })
    //   .execute();

    // return social;

    return await this.prismaService.social.delete({
      where: {
        id,
      },
    });
  }
}
