import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SocialService } from './social.service';
import { SocialResolver } from './social.resolver';
import { Social } from './entities/social.entity';
import { InstructorModule } from '../instructor/instructor.module';

@Module({
  imports: [TypeOrmModule.forFeature([Social]), InstructorModule],
  providers: [SocialService, SocialResolver],
})
export class SocialModule {}
