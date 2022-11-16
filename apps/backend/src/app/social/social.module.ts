import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '@zeenzen/database';

import { SocialService } from './social.service';
import { SocialResolver } from './social.resolver';
import { Social } from './entities/social.entity';
import { InstructorModule } from '../instructor/instructor.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Social]),
    InstructorModule,
    DatabaseModule,
  ],
  providers: [SocialService, SocialResolver],
})
export class SocialModule {}
