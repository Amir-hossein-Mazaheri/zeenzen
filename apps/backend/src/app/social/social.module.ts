import { Module } from '@nestjs/common';
import { DatabaseModule } from '@zeenzen/database';

import { SocialService } from './social.service';
import { SocialResolver } from './social.resolver';
import { InstructorModule } from '../instructor/instructor.module';

@Module({
  imports: [InstructorModule, DatabaseModule],
  providers: [SocialService, SocialResolver],
})
export class SocialModule {}
