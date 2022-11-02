import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { SocialService } from './social.service';
import { Social } from './entities/social.entity';
import { CreateSocialInput } from './dto/create-social.input';
import { UpdateSocialInput } from './dto/update-social.input';
import { GetInstructorId } from '../instructor/decorators/instructor.decorator';
import { UserRole } from '../types';
import { Roles } from '../user/decorators/roles.decorator';
import { SkipRoles } from '../user/decorators/skip-roles.decorator';

@Roles(UserRole.INSTRUCTOR)
@Resolver(() => Social)
export class SocialResolver {
  constructor(private readonly socialService: SocialService) {}

  @Mutation(() => Social, {
    description: 'creates a social(only for instructors).',
  })
  createSocial(
    @Args('createSocialInput') createSocialInput: CreateSocialInput,
    @GetInstructorId() instructorId: number
  ) {
    return this.socialService.create(createSocialInput, instructorId);
  }

  @SkipRoles()
  @Query(() => [Social], {
    name: 'socials',
    description: 'returns all socials.',
  })
  findAll() {
    return this.socialService.findAll();
  }

  @SkipRoles()
  @Query(() => Social, {
    name: 'social',
    description: 'return a single social.',
  })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.socialService.findOne(id);
  }

  @Mutation(() => Social, {
    description: 'updates an instructor social(only for instructors).',
  })
  updateSocial(
    @Args('updateSocialInput') updateSocialInput: UpdateSocialInput,
    @GetInstructorId() instructorId: number
  ) {
    return this.socialService.update(
      updateSocialInput.id,
      updateSocialInput,
      instructorId
    );
  }

  @Mutation(() => Social, {
    description: 'removes an instructor social(only for instructors).',
  })
  removeSocial(
    @Args('id', { type: () => Int }) id: number,
    @GetInstructorId() instructorId: number
  ) {
    return this.socialService.remove(id, instructorId);
  }
}
