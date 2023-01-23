import { Module } from '@nestjs/common';
import { DatabaseModule } from '@zeenzen/database';

import { ExpertiseService } from './expertise.service';
import { ExpertiseResolver } from './expertise.resolver';
import { InstructorModule } from '../instructor/instructor.module';

@Module({
  imports: [InstructorModule, DatabaseModule],
  providers: [ExpertiseResolver, ExpertiseService],
})
export class ExpertiseModule {}
