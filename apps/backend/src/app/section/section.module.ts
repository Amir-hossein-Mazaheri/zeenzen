import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '@zeenzen/database';

import { SectionService } from './section.service';
import { SectionResolver } from './section.resolver';
import { Section } from './entities/section.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Section]), DatabaseModule],
  providers: [SectionService, SectionResolver],
  exports: [TypeOrmModule],
})
export class SectionModule {}
