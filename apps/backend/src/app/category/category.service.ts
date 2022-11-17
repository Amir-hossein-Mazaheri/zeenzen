import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@zeenzen/database';
import { Repository } from 'typeorm';

import { RequestUser } from '../types';
import { User } from '../user/entities/user.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  private relations: Prisma.CategoryInclude = {
    createdBy: true,
  };

  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly prismaService: PrismaService
  ) {}

  async validateCategory(id: number) {
    // const category = await this.categoryRepository.findOne({
    //   where: { id },
    //   relations: this.categoryRelations,
    // });

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
    // return await this.userRepository.findOneBy({ id: userId });
    return await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async create({ label }: CreateCategoryInput, user: RequestUser) {
    // const newCategory = new Category();
    // newCategory.label = label;
    // newCategory.createdBy = await this.resolveUser(user.sub);

    // await this.categoryRepository.manager.save(newCategory);

    // return newCategory;
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
    // return await this.categoryRepository.find({
    //   relations: this.relations,
    // });
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

    // await this.categoryRepository.update(id, updateCategoryInput);

    // return category;

    return await this.prismaService.category.update({
      where: {
        id,
      },
      data: updateCategoryInput,
    });
  }
}
