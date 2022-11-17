import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '@zeenzen/database';

import { LogsService } from './logs.service';
import { LogsResolver } from './logs.resolver';
import { ErrorLog } from './entities/error-log.entity';
import { UserLog } from './entities/user-log.entity';
import { UserModule } from '../user/user.module';

@Global()
@Module({
  imports: [
    // TypeOrmModule.forFeature([ErrorLog, UserLog]),
    UserModule,
    DatabaseModule,
  ],
  providers: [LogsResolver, LogsService],
  exports: [LogsService],
})
export class LogsModule {}
