import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { ExpertiseService } from './expertise.service';
import { Expertise } from './entities/expertise.entity';
import { CreateExpertiseInput } from './dto/create-expertise.input';
import { UpdateExpertiseInput } from './dto/update-expertise.input';
import { Public } from '../auth/decorators/public.decorator';
import { GetInstructorId } from '../instructor/decorators/instructor.decorator';
import { UserRole, RequestInstructor } from '../types';
import { Roles } from '../user/decorators/roles.decorator';
import { GetUser } from '../user/decorators/user.decorator';

@Roles(UserRole.INSTRUCTOR)
@Resolver(() => Expertise)
export class ExpertiseResolver {
  constructor(private readonly expertiseService: ExpertiseService) {}

  @Mutation(() => Expertise, {
    description: 'creates an expertise(only for instructors).',
  })
  createExpertise(
    @Args('createExpertiseInput') createExpertiseInput: CreateExpertiseInput,
    @GetInstructorId() instructorId: number
  ) {
    return this.expertiseService.create(createExpertiseInput, instructorId);
  }

  @Public()
  @Query(() => [Expertise], {
    name: 'expertises',
    description: 'returns all expertises.',
  })
  findAll() {
    return this.expertiseService.findAll();
  }

  @Public()
  @Query(() => Expertise, {
    name: 'expertise',
    description: 'returns a single expertise.',
  })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.expertiseService.findOne(id);
  }

  @Mutation(() => Expertise, {
    description:
      "mark target expertise as primary and set others instructor's expertise isPrimary to false.",
  })
  markExpertiseAsPrimary(
    @Args('id', { type: () => Int }) id: number,
    @GetUser() user: RequestInstructor
  ) {
    return this.expertiseService.markExpertiseAsPrimary(id, user);
  }

  @Roles(UserRole.ADMIN)
  @Mutation(() => Expertise, {
    description: 'validate expertise as validated(only for admins).',
  })
  validateExpertise(@Args('id', { type: () => Int }) id: number) {
    return this.expertiseService.adminValidateExpertise(id);
  }

  @Mutation(() => Expertise, {
    description: 'updates an expertise that belongs to instructor.',
  })
  updateExpertise(
    @Args('updateExpertiseInput') updateExpertiseInput: UpdateExpertiseInput,
    @GetInstructorId() instructorId: number
  ) {
    return this.expertiseService.update(
      updateExpertiseInput.id,
      instructorId,
      updateExpertiseInput
    );
  }

  @Mutation(() => Expertise, {
    description: 'removes an expertise that belongs to instructor.',
  })
  removeExpertise(
    @Args('id', { type: () => Int }) id: number,
    @GetInstructorId() instructorId: number
  ) {
    return this.expertiseService.remove(id, instructorId);
  }
}
