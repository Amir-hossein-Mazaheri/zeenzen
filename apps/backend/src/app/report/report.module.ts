import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '@zeenzen/database';

import { ReportService } from './report.service';
import { ReportResolver } from './report.resolver';
import { Report } from './entities/report.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Report]), UserModule, DatabaseModule],
  providers: [ReportResolver, ReportService],
})
export class ReportModule {}
