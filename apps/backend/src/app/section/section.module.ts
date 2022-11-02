import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SectionService } from './section.service';
import { SectionResolver } from './section.resolver';
import { Section } from './entities/section.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Section])],
  providers: [SectionService, SectionResolver],
  exports: [TypeOrmModule],
})
export class SectionModule {}
