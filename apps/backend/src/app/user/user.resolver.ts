import { UseGuards } from '@nestjs/common/decorators';
import {
  Resolver,
  Query,
  Args,
  Int,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { Cart } from '../cart/entities/cart.entity';
import { RequestUser, UserRole } from '../types';
import { Avatar } from '../uploads/entities/avatar.entity';

import { Roles } from './decorators/roles.decorator';
import { SkipRoles } from './decorators/skip-roles.decorator';
import { GetUser } from './decorators/user.decorator';
import { LimitedUpdateUserInput } from './dto/limited-update-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@UseGuards(AuthenticatedGuard)
@Roles(UserRole.ADMIN)
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @ResolveField('avatar', () => Avatar, { nullable: true, description: '' })
  getAvatar(@Parent() user: User) {
    return this.userService.getAvatar(user.id);
  }

  @ResolveField('cart', () => Cart)
  getCart(@Parent() user: User) {
    return this.userService.getCart(user.id);
  }

  @SkipRoles()
  @Query(() => User, {
    name: 'me',
    description: 'returns logged in user credentials.',
  })
  user(@GetUser() user: RequestUser) {
    return this.userService.findOne(user.sub);
  }

  @Query(() => [User], {
    name: 'users',
    description: 'returns all users(only for admins).',
  })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, {
    name: 'user',
    description: 'returns a single user(only for admins).',
  })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User, { description: 'updates a user(only for admins).' })
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @SkipRoles()
  @Mutation(() => User, {
    description:
      'updates a user(limited and its should be used for customers).',
  })
  limitedUpdateUser(
    @Args('limitedUpdateUserInput')
    limitedUpdateUserInput: LimitedUpdateUserInput,
    @GetUser() user: RequestUser
  ) {
    return this.userService.limitedUpdateUser(limitedUpdateUserInput, user);
  }

  @Mutation(() => User, {
    description: 'soft deletes a user(only for admins).',
  })
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }

  @Mutation(() => User, {
    description: 'restores a soft deleted user(only for admins).',
  })
  restoreUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.restore(id);
  }
}
