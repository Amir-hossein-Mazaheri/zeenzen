import { ObjectType, Field, Int } from '@nestjs/graphql';

import { TicketTopic, TicketPriority } from '../../types';
import { User } from '../../user/entities/user.entity';
import { TicketMessage } from './ticket-message.entity';

@ObjectType()
export class Ticket {
  @Field(() => Int, { description: 'ticket id.' })
  id: number;

  @Field(() => String, { description: 'ticket title.' })
  title: string;

  @Field(() => String, { description: 'ticket detailed description.' })
  description: string;

  @Field(() => TicketTopic, { description: 'ticket topic which is an enum.' })
  topic: TicketTopic;

  @Field(() => TicketPriority, {
    description: 'ticket priority which is an enum.',
  })
  priority: TicketPriority;

  @Field(() => Boolean, {
    description:
      'determines that any new message can be assigned to ticket or not.',
  })
  isClosed: boolean;

  @Field(() => Date, { description: 'time of ticket creation.' })
  createdAt: Date;

  @Field(() => Date, {
    description: 'time that ticket got closed.',
    nullable: true,
  })
  closedAt: Date;

  @Field(() => User, { description: 'user who sent the ticket.' })
  whoAsked: User;

  @Field(() => [TicketMessage], {
    nullable: true,
    description: 'list of messages in ticket in chat kinda thing.',
  })
  messages: TicketMessage[];
}
