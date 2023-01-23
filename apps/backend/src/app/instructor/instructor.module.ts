import { Module } from '@nestjs/common';
import { DatabaseModule } from '@zeenzen/database';

import { InstructorService } from './instructor.service';
import { InstructorResolver } from './instructor.resolver';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule, DatabaseModule],
  providers: [InstructorService, InstructorResolver],
})
export class InstructorModule {}
