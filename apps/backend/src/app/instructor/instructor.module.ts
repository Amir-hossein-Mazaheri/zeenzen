import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InstructorService } from './instructor.service';
import { InstructorResolver } from './instructor.resolver';
import { Instructor } from './entities/instructor.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Instructor]), UserModule],
  providers: [InstructorService, InstructorResolver],
  exports: [TypeOrmModule],
})
export class InstructorModule {}
