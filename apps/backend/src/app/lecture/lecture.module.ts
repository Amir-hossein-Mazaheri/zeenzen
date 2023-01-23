import { Module } from '@nestjs/common';
import { DatabaseModule } from '@zeenzen/database';

import { LectureService } from './lecture.service';
import { LectureResolver } from './lecture.resolver';
import { SectionModule } from '../section/section.module';

@Module({
  imports: [SectionModule, DatabaseModule],
  providers: [LectureService, LectureResolver],
})
export class LectureModule {}
