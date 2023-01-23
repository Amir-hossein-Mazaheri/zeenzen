import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from '@zeenzen/database';

import { LogsService } from './logs.service';
import { LogsResolver } from './logs.resolver';
import { UserModule } from '../user/user.module';

@Global()
@Module({
  imports: [UserModule, DatabaseModule],
  providers: [LogsResolver, LogsService],
  exports: [LogsService],
})
export class LogsModule {}
