import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { TicketTopic, TicketPriority } from '../../types';
import { User } from '../../user/entities/user.entity';
import { TicketMessage } from './ticket-message.entity';

@Entity()
@ObjectType()
export class Ticket {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'ticket id.' })
  id: number;

  @Column()
  @Field(() => String, { description: 'ticket title.' })
  title: string;

  @Column('text')
  @Field(() => String, { description: 'ticket detailed description.' })
  description: string;

  @Column({ type: 'enum', enum: TicketTopic })
  @Field(() => TicketTopic, { description: 'ticket topic which is an enum.' })
  topic: TicketTopic;

  @Column({ type: 'enum', enum: TicketPriority })
  @Field(() => TicketPriority, {
    description: 'ticket priority which is an enum.',
  })
  priority: TicketPriority;

  @Column({ default: false })
  @Field(() => Boolean, {
    description:
      'determines that any new message can be assigned to ticket or not.',
  })
  isClosed: boolean;

  @CreateDateColumn()
  @Field(() => Date, { description: 'time of ticket creation.' })
  createdAt: Date;

  @Column({ type: 'date', nullable: true })
  @Field(() => Date, {
    description: 'time that ticket got closed.',
    nullable: true,
  })
  closedAt: Date;

  @ManyToOne(() => User, (user) => user.tickets)
  @Field(() => User, { description: 'user who sent the ticket.' })
  whoAsked: User;

  @OneToMany(() => TicketMessage, (ticketMessage) => ticketMessage.ticket, {
    cascade: true,
  })
  @Field(() => [TicketMessage], {
    nullable: true,
    description: 'list of messages in ticket in chat kinda thing.',
  })
  messages: TicketMessage[];
}
