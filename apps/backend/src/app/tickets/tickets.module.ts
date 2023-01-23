import { Module } from '@nestjs/common';
import { DatabaseModule } from '@zeenzen/database';

import { TicketsService } from './tickets.service';
import { TicketsResolver } from './tickets.resolver';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule, DatabaseModule],
  providers: [TicketsResolver, TicketsService],
})
export class TicketsModule {}
