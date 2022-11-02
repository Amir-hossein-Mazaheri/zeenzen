import {
  Resolver,
  Query,
  Mutation,
  Args,
  Subscription,
  ID,
  Context,
} from '@nestjs/graphql';

import { TicketsService } from './tickets.service';
import { Ticket } from './entities/ticket.entity';
import { CreateTicketInput } from './dto/create-ticket.input';
import { SendTicketMessageInput } from './dto/send-ticket-message.input';
import { TicketMessage } from './entities/ticket-message.entity';
import { UserRole, RequestUser } from '../types';
import { Roles } from '../user/decorators/roles.decorator';
import { GetUser } from '../user/decorators/user.decorator';

@Roles(UserRole.CUSTOMER)
@Resolver(() => Ticket)
export class TicketsResolver {
  constructor(private readonly ticketsService: TicketsService) {}

  @Mutation(() => Ticket)
  createTicket(
    @Args('createTicketInput') createTicketInput: CreateTicketInput,
    @GetUser() user: RequestUser
  ) {
    return this.ticketsService.create(createTicketInput, user);
  }

  @Subscription(() => [Ticket], {
    name: 'tickets',
    filter(payload, variables, context) {
      console.log('payload: ', payload);
      console.log('variables: ', variables);
      console.log('context: ', context);

      return true;
    },
  })
  findAll(@Context() ctx: any) {
    // console.log(user);
    console.log(ctx);
    return this.ticketsService.findAll();
  }

  @Query(() => [Ticket], { name: 'tickets' })
  findAllTickets(@GetUser() user: RequestUser) {
    return this.ticketsService.findAllTickets(user);
  }

  @Query(() => Ticket, { name: 'ticket' })
  findOne(
    @Args('id', { type: () => ID }) id: number,
    @GetUser() user: RequestUser
  ) {
    return this.ticketsService.findOne(id, user);
  }

  @Subscription(() => [TicketMessage], {
    name: 'ticketMessages',
    filter(payload, variables, context) {
      console.log(payload);
      console.log(variables);
      console.log(context);

      return true;
    },
  })
  ticketMessages() {
    return this.ticketsService.ticketMessages();
  }

  @Mutation(() => TicketMessage)
  sendTicketMessage(
    @Args('sendTicketMessageInput')
    sendTicketMessageInput: SendTicketMessageInput,
    @GetUser() user: RequestUser
  ) {
    return this.ticketsService.sendTicketMessage(sendTicketMessageInput, user);
  }

  @Mutation(() => Ticket)
  closeTicket(@Args('id') id: number, @GetUser() user: RequestUser) {
    return this.ticketsService.closeTicket(id, user);
  }
}
