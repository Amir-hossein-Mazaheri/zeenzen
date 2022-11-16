import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '@zeenzen/database';

import { CourseService } from './course.service';
import { CourseResolver } from './course.resolver';
import { Course } from './entities/course.entity';
import { CategoryModule } from '../category/category.module';
import { InstructorModule } from '../instructor/instructor.module';
import { PreRequirementModule } from '../pre-requirement/pre-requirement.module';
import { SectionModule } from '../section/section.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course]),
    CategoryModule,
    InstructorModule,
    SectionModule,
    PreRequirementModule,
    DatabaseModule,
  ],
  providers: [CourseService, CourseResolver],
  exports: [TypeOrmModule, CourseService],
})
export class CourseModule {}
