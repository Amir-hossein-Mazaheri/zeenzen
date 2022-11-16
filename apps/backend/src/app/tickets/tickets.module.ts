import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '@zeenzen/database';

import { TicketsService } from './tickets.service';
import { TicketsResolver } from './tickets.resolver';
import { Ticket } from './entities/ticket.entity';
import { TicketMessage } from './entities/ticket-message.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket, TicketMessage]),
    UserModule,
    DatabaseModule,
  ],
  providers: [TicketsResolver, TicketsService],
})
export class TicketsModule {}
