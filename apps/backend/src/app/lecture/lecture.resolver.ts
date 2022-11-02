import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { LectureService } from './lecture.service';
import { Lecture } from './entities/lecture.entity';
import { CreateLectureInput } from './dto/create-lecture.input';
import { UpdateLectureInput } from './dto/update-lecture.input';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { GetInstructorId } from '../instructor/decorators/instructor.decorator';
import { UserRole } from '../types';
import { Roles } from '../user/decorators/roles.decorator';

@UseGuards(AuthenticatedGuard)
@Roles(UserRole.INSTRUCTOR)
@Resolver(() => Lecture)
export class LectureResolver {
  constructor(private readonly lectureService: LectureService) {}

  @Mutation(() => Lecture, {
    description: 'creates a lecture(only instructors).',
  })
  createLecture(
    @Args('createLectureInput') createLectureInput: CreateLectureInput
  ) {
    return this.lectureService.create(createLectureInput);
  }

  @Query(() => [Lecture], {
    name: 'lectures',
    description: 'returns all lectures.',
  })
  findAll() {
    return this.lectureService.findAll();
  }

  @Query(() => Lecture, {
    name: 'lecture',
    description: 'returns a single lecture.',
  })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.lectureService.findOne(id);
  }

  @Mutation(() => Lecture, {
    description: 'updates a lecture that belongs to instructor.',
  })
  updateLecture(
    @Args('updateLectureInput') updateLectureInput: UpdateLectureInput,
    @GetInstructorId() instructorId: number
  ) {
    return this.lectureService.update(
      updateLectureInput.id,
      updateLectureInput,
      instructorId
    );
  }

  @Mutation(() => Lecture, {
    description: 'removes a lecture that belongs to instructor.',
  })
  removeLecture(
    @Args('id', { type: () => Int }) id: number,
    @GetInstructorId() instructorId: number
  ) {
    return this.lectureService.remove(id, instructorId);
  }

  @Mutation(() => Lecture, {
    description:
      'restore a lecture that belongs to instructor and has been removed..',
  })
  restoreLecture(
    @Args('id', { type: () => Int }) id: number,
    @GetInstructorId() instructorId: number
  ) {
    return this.lectureService.restore(id, instructorId);
  }
}
