import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@zeenzen/database';

import { RequestUser } from '../types';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';

@Injectable()
export class CategoryService {
  private relations: Prisma.CategoryInclude = {
    createdBy: true,
  };

  constructor(private readonly prismaService: PrismaService) {}

  async validateCategory(id: number) {
    const category = await this.prismaService.category.findUnique({
      where: { id },
      include: {
        createdBy: true,
      },
    });

    if (!category) {
      throw new BadRequestException('Invalid category id.');
    }

    return category;
  }

  async resolveUser(userId: number) {
    return await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async create({ label }: CreateCategoryInput, user: RequestUser) {
    return await this.prismaService.category.create({
      data: {
        label,
        createdBy: {
          connect: { id: user.sub },
        },
      },
    });
  }

  async findAll() {
    return await this.prismaService.category.findMany({
      include: this.relations,
    });
  }

  async findOne(id: number) {
    return await this.validateCategory(id);
  }

  async update(
    id: number,
    updateCategoryInput: UpdateCategoryInput,
    user: RequestUser
  ) {
    const category = await this.validateCategory(id);

    if (category.createdBy.id !== user.sub) {
      throw new ForbiddenException("You can't modify this category");
    }

    return await this.prismaService.category.update({
      where: {
        id,
      },
      data: updateCategoryInput,
    });
  }
}
