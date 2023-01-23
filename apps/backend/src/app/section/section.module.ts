import { Module } from '@nestjs/common';
import { DatabaseModule } from '@zeenzen/database';

import { SectionService } from './section.service';
import { SectionResolver } from './section.resolver';

@Module({
  imports: [DatabaseModule],
  providers: [SectionService, SectionResolver],
})
export class SectionModule {}
