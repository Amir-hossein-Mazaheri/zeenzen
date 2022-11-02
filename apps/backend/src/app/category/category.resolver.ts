import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { UserRole, RequestUser } from '../types';
import { Roles } from '../user/decorators/roles.decorator';
import { GetUser } from '../user/decorators/user.decorator';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Roles(UserRole.ADMIN)
  @Mutation(() => Category, {
    description: 'creates a category(only for admins).',
  })
  createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
    @GetUser() user: RequestUser
  ) {
    return this.categoryService.create(createCategoryInput, user);
  }

  @Query(() => [Category], {
    name: 'categories',
    description: 'returns all categories.',
  })
  findAll() {
    return this.categoryService.findAll();
  }

  @Query(() => Category, {
    name: 'category',
    description: 'returns a single category.',
  })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.categoryService.findOne(id);
  }

  @Roles(UserRole.ADMIN)
  @Mutation(() => Category, {
    description: 'updates and returns old category.',
  })
  updateCategory(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
    @GetUser() user: RequestUser
  ) {
    return this.categoryService.update(
      updateCategoryInput.id,
      updateCategoryInput,
      user
    );
  }
}
