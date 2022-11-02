import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RequestUser } from '../types';
import { User } from '../user/entities/user.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  private categoryRelations = ['createdBy'];

  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async validateCategory(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: this.categoryRelations,
    });

    if (!category) {
      throw new BadRequestException('Invalid category id.');
    }

    return category;
  }

  async resolveUser(userId: number) {
    return await this.userRepository.findOneBy({ id: userId });
  }

  async create({ label }: CreateCategoryInput, user: RequestUser) {
    const newCategory = new Category();
    newCategory.label = label;
    newCategory.createdBy = await this.resolveUser(user.sub);

    await this.categoryRepository.manager.save(newCategory);

    return newCategory;
  }

  async findAll() {
    return await this.categoryRepository.find({
      relations: this.categoryRelations,
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

    await this.categoryRepository.update(id, updateCategoryInput);

    return category;
  }
}
