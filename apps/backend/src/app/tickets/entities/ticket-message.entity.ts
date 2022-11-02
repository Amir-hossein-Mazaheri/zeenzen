import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../../user/entities/user.entity';
import { Ticket } from './ticket.entity';

@Entity()
@ObjectType()
export class TicketMessage {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'ticket message id.' })
  id: number;

  @Column({ length: 1000 })
  @Field(() => String, { description: 'content of ticket message.' })
  message: string;

  @CreateDateColumn()
  @Field(() => Date, { description: 'time that user sent the ticket message.' })
  sentAt: Date;

  @ManyToOne(() => Ticket, (ticket) => ticket.messages)
  @Field(() => Ticket, {
    description: 'parent ticket of ticket message.',
  })
  ticket: Ticket;

  @ManyToOne(() => User, (user) => user.ticketMessages)
  @Field(() => User, { description: 'user who sent this ticket message.' })
  user: User;
}
