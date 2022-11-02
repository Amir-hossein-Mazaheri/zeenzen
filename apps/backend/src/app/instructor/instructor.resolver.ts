import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { Expertise } from '../expertise/entities/expertise.entity';
import { UserRole } from '../types';
import { Roles } from '../user/decorators/roles.decorator';
import { SkipRoles } from '../user/decorators/skip-roles.decorator';
import { User } from '../user/entities/user.entity';
import { CreateInstructorInput } from './dto/create-instructor.input';
import { UpdateInstructorInput } from './dto/update-instructor.input';
import { Instructor } from './entities/instructor.entity';
import { InstructorService } from './instructor.service';

@Roles(UserRole.ADMIN)
@Resolver(() => Instructor)
export class InstructorResolver {
  constructor(private readonly instructorsService: InstructorService) {}

  @ResolveField('user', () => User, {
    description: 'returns logged in user credentials.',
  })
  getUser(@Parent() instructor: Instructor) {
    return this.instructorsService.getUser(instructor.id);
  }

  @ResolveField('expertises', () => [Expertise])
  getExpertises(@Parent() instructor: Instructor) {
    console.log(instructor);
    return this.instructorsService.getExpertises(instructor.id);
  }

  @Mutation(() => Instructor, {
    description: 'creates an instructor(only for admins).',
  })
  createInstructor(
    @Args('createInstructorInput') createInstructorInput: CreateInstructorInput
  ) {
    return this.instructorsService.create(createInstructorInput);
  }

  @SkipRoles()
  @Query(() => [Instructor], {
    name: 'instructors',
    description: 'returns all instructors.',
  })
  findAll() {
    return this.instructorsService.findAll();
  }

  @SkipRoles()
  @Query(() => Instructor, {
    name: 'instructor',
    description: 'returns a single instructors.',
  })
  findOne(@Args('id', { type: () => ID }) id: number) {
    return this.instructorsService.findOne(id);
  }

  @Mutation(() => Instructor, {
    description: 'updates an instructor(only for admins).',
  })
  updateInstructor(
    @Args('updateInstructorInput') updateInstructorInput: UpdateInstructorInput
  ) {
    return this.instructorsService.update(
      updateInstructorInput.id,
      updateInstructorInput
    );
  }
}
