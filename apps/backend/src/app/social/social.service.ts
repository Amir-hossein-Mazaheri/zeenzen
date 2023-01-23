import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@zeenzen/database';

import { CreateSocialInput } from './dto/create-social.input';
import { UpdateSocialInput } from './dto/update-social.input';

@Injectable()
export class SocialService {
  constructor(private readonly prismaService: PrismaService) {}

  validateSocial(id: number) {
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

    return await this.prismaService.social.update({
      where: {
        id,
      },
      data: updateSocialInput,
    });
  }

  async remove(id: number, instructorId: number) {
    await this.validateSocial(id)(instructorId);

    return await this.prismaService.social.delete({
      where: {
        id,
      },
    });
  }
}
