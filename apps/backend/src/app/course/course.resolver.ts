import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { CourseService } from './course.service';
import { CreateCourseInput } from './dto/create-course.input';
import { PaginatedCourses } from './entities/paginated-courses.entity';
import { UpdateCourseInput } from './dto/update-course.input';
import { Course } from './entities/course.entity';
import { PaginatedCoursesFilterInput } from './dto/paginated-courses-filter.input';
import { Public } from '../auth/decorators/public.decorator';
import { GetInstructorId } from '../instructor/decorators/instructor.decorator';
import { Instructor } from '../instructor/entities/instructor.entity';
import { RequestUser, UserRole } from '../types';
import { CourseImage } from '../uploads/entities/course-image.entity';
import { Roles } from '../user/decorators/roles.decorator';
import { GetUserRole } from '../user/decorators/user-role.decorator';
import { GetUser } from '../user/decorators/user.decorator';

@Roles(UserRole.INSTRUCTOR)
@Resolver(() => Course)
export class CourseResolver {
  constructor(private readonly coursesService: CourseService) {}

  @Public()
  @ResolveField('instructors', () => [Instructor])
  getInstructors(@Parent() course: Course) {
    return this.coursesService.getInstructors(course.id);
  }

  @ResolveField('image', () => CourseImage, {
    description: 'resolve image field.',
  })
  getImage(@Parent() course: Course) {
    return this.coursesService.getImage(course.id);
  }

  @Roles(UserRole.ADMIN)
  @Mutation(() => Course, {
    description: 'creates a course in draft mode(only for admins).',
  })
  createCourse(
    @Args('createCourseInput') createCourseInput: CreateCourseInput
  ) {
    return this.coursesService.create(createCourseInput);
  }

  @Roles(UserRole.ADMIN)
  @Mutation(() => Course, {
    description: 'publish a draft course(only for admins).',
  })
  publishCourse(@Args('id', { type: () => Int }) id: number) {
    return this.coursesService.publish(id);
  }

  @Public()
  @Query(() => PaginatedCourses, {
    name: 'paginatedCourses',
    description: 'returns all published courses.',
  })
  findAll(
    @Args('paginatedCoursesFilterInput', { nullable: true })
    paginatedCoursesFilterInput: PaginatedCoursesFilterInput,
    @GetUser() user: RequestUser
  ) {
    return this.coursesService.findAll(paginatedCoursesFilterInput, user);
  }

  @Public()
  @Query(() => Course, {
    name: 'course',
    description: 'returns a single published course.',
  })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.coursesService.findOne(id);
  }

  @Query(() => [Course], {
    description: 'returns all instructors courses(only for instructors).',
  })
  instructorCourses(
    @GetInstructorId() instructorId: number,
    @GetUserRole() userRole: UserRole
  ) {
    return this.coursesService.instructorCourses(instructorId, userRole);
  }

  @Query(() => Course, {
    description: 'returns a single instructors course(only for instructors).',
  })
  instructorCourse(
    @Args('id', { type: () => Int }) id: number,
    @GetInstructorId() instructorId: number,
    @GetUserRole() userRole: UserRole
  ) {
    return this.coursesService.instructorCourse(id, instructorId, userRole);
  }

  @Mutation(() => Course, {
    description:
      'updates course that belongs to instructor or any course if the user is admin.',
  })
  updateCourse(
    @Args('updateCourseInput') updateCourseInput: UpdateCourseInput,
    @GetInstructorId() instructorId: number,
    @GetUserRole() userRole: UserRole
  ) {
    return this.coursesService.update(
      updateCourseInput.id,
      updateCourseInput,
      userRole,
      instructorId
    );
  }

  @Roles(UserRole.ADMIN)
  @Mutation(() => Course, {
    description: 'soft deletes course(only for admins).',
  })
  removeCourse(@Args('id', { type: () => Int }) id: number) {
    return this.coursesService.remove(id);
  }

  @Roles(UserRole.ADMIN)
  @Mutation(() => Course, {
    description: 'restore a deleted course(only for admins).',
  })
  restoreCourse(@Args('id', { type: () => Int }) id: number) {
    return this.coursesService.restore(id);
  }
}
