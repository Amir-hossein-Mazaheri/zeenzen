import { Module } from '@nestjs/common';

import { HealthCheckService } from './health-check.service';

@Module({
  providers: [HealthCheckService],
})
export class HealthCheckModule {}
