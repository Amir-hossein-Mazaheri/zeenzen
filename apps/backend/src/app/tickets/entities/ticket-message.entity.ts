import { Field, Int, ObjectType } from '@nestjs/graphql';

import { User } from '../../user/entities/user.entity';
import { Ticket } from './ticket.entity';

@ObjectType()
export class TicketMessage {
  @Field(() => Int, { description: 'ticket message id.' })
  id: number;

  @Field(() => String, { description: 'content of ticket message.' })
  message: string;

  @Field(() => Date, { description: 'time that user sent the ticket message.' })
  sentAt: Date;

  @Field(() => Ticket, {
    description: 'parent ticket of ticket message.',
  })
  ticket: Ticket;

  @Field(() => User, { description: 'user who sent this ticket message.' })
  user: User;
}
