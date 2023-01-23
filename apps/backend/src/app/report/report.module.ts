import { Module } from '@nestjs/common';
import { DatabaseModule } from '@zeenzen/database';

import { ReportService } from './report.service';
import { ReportResolver } from './report.resolver';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule, DatabaseModule],
  providers: [ReportResolver, ReportService],
})
export class ReportModule {}
