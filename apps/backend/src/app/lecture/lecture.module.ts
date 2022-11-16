import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '@zeenzen/database';

import { LectureService } from './lecture.service';
import { LectureResolver } from './lecture.resolver';
import { Lecture } from './entities/lecture.entity';
import { SectionModule } from '../section/section.module';

@Module({
  imports: [TypeOrmModule.forFeature([Lecture]), SectionModule, DatabaseModule],
  providers: [LectureService, LectureResolver],
})
export class LectureModule {}
