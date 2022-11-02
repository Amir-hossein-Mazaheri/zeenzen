import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExpertiseService } from './expertise.service';
import { ExpertiseResolver } from './expertise.resolver';
import { Expertise } from './entities/expertise.entity';
import { InstructorModule } from '../instructor/instructor.module';

@Module({
  imports: [TypeOrmModule.forFeature([Expertise]), InstructorModule],
  providers: [ExpertiseResolver, ExpertiseService],
})
export class ExpertiseModule {}
