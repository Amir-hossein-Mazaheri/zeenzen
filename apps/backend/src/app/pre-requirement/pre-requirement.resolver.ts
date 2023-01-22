import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { PreRequirementService } from './pre-requirement.service';
import { PreRequirement } from './entities/pre-requirement.entity';
import { CreatePreRequirementInput } from './dto/create-pre-requirement.input';
import { UpdatePreRequirementInput } from './dto/update-pre-requirement.input';
import { GetInstructorId } from '../instructor/decorators/instructor.decorator';
import { UserRole } from '../types';
import { Roles } from '../user/decorators/roles.decorator';
import { SkipRoles } from '../user/decorators/skip-roles.decorator';

@Roles(UserRole.INSTRUCTOR)
@Resolver(() => PreRequirement)
export class PreRequirementResolver {
  constructor(private readonly preRequirementService: PreRequirementService) {}

  @Mutation(() => PreRequirement, { description: 'creates a pre requirement.' })
  createPreRequirement(
    @Args('createPreRequirementInput')
    createPreRequirementInput: CreatePreRequirementInput
  ) {
    return this.preRequirementService.create(createPreRequirementInput);
  }

  @SkipRoles()
  @Query(() => [PreRequirement], {
    name: 'preRequirements',
    description: 'returns all pre requirements.',
  })
  findAll(@Args('id', { type: () => Int }) id: number) {
    return this.preRequirementService.findAll(id);
  }

  @SkipRoles()
  @Query(() => PreRequirement, {
    name: 'preRequirement',
    description: 'returns a single pre requirement.',
  })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.preRequirementService.findOne(id);
  }

  @Mutation(() => PreRequirement, {
    description: 'updates a pre requirement.',
  })
  updatePreRequirement(
    @Args('updatePreRequirementInput')
    updatePreRequirementInput: UpdatePreRequirementInput,
    @GetInstructorId() instructorId: number
  ) {
    return this.preRequirementService.update(
      updatePreRequirementInput.id,
      updatePreRequirementInput,
      instructorId
    );
  }

  @Mutation(() => PreRequirement, {
    description: 'soft delete a pre requirement.',
  })
  removePreRequirement(
    @Args('id', { type: () => Int }) id: number,
    @GetInstructorId() instructorId: number
  ) {
    return this.preRequirementService.remove(id, instructorId);
  }

  @Mutation(() => PreRequirement, {
    description: 'restore a soft deleted pre requirement.',
  })
  restorePreRequirement(
    @Args('id', { type: () => Int }) id: number,
    @GetInstructorId() instructorId: number
  ) {
    return this.preRequirementService.restore(id, instructorId);
  }
}
