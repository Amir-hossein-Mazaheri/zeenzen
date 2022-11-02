import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { SectionService } from './section.service';
import { Section } from './entities/section.entity';
import { CreateSectionInput } from './dto/create-section.input';
import { UpdateSectionInput } from './dto/update-section.input';
import { FindAllSectionInput } from './dto/find-all-section.input';
import { Public } from '../auth/decorators/public.decorator';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { GetInstructorId } from '../instructor/decorators/instructor.decorator';
import { UserRole } from '../types';
import { Roles } from '../user/decorators/roles.decorator';

@UseGuards(AuthenticatedGuard)
@Roles(UserRole.INSTRUCTOR)
@Resolver(() => Section)
export class SectionResolver {
  constructor(private readonly sectionService: SectionService) {}

  @Mutation(() => Section, {
    description: 'creates a section(only for instructors).',
  })
  createSection(
    @Args('createSectionInput') createSectionInput: CreateSectionInput
  ) {
    return this.sectionService.create(createSectionInput);
  }

  @Public()
  @Query(() => [Section], {
    name: 'sections',
    description: 'returns all sections.',
  })
  findAll(
    @Args('findAllSectionInput', { defaultValue: {} })
    findAllSectionInput: FindAllSectionInput
  ) {
    return this.sectionService.findAll(findAllSectionInput);
  }

  @Public()
  @Query(() => Section, {
    name: 'section',
    description: 'return a single section.',
  })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.sectionService.findOne(id);
  }

  @Mutation(() => Section, {
    description:
      'updates an instructor section or if user is admin any other section.',
  })
  updateSection(
    @Args('updateSectionInput') updateSectionInput: UpdateSectionInput,
    @GetInstructorId() instructorId: number
  ) {
    return this.sectionService.update(
      updateSectionInput.id,
      updateSectionInput,
      instructorId
    );
  }

  @Mutation(() => Section, {
    description:
      'removes an instructor section or if user is admin any other section.',
  })
  removeSection(
    @Args('id', { type: () => Int }) id: number,
    @GetInstructorId() instructorId: number
  ) {
    return this.sectionService.remove(id, instructorId);
  }

  @Mutation(() => Section, {
    description:
      'restore a soft deleted instructor section or if user is admin any other section.',
  })
  restoreSection(
    @Args('id', { type: () => Int }) id: number,
    @GetInstructorId() instructorId: number
  ) {
    return this.sectionService.restore(id, instructorId);
  }
}
