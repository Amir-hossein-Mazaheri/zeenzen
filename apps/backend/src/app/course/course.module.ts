import { Module } from '@nestjs/common';
import { DatabaseModule } from '@zeenzen/database';

import { CourseService } from './course.service';
import { CourseResolver } from './course.resolver';
import { CategoryModule } from '../category/category.module';
import { InstructorModule } from '../instructor/instructor.module';
import { PreRequirementModule } from '../pre-requirement/pre-requirement.module';
import { SectionModule } from '../section/section.module';

@Module({
  imports: [
    CategoryModule,
    InstructorModule,
    SectionModule,
    PreRequirementModule,
    DatabaseModule,
  ],
  providers: [CourseService, CourseResolver],
  exports: [CourseService],
})
export class CourseModule {}
