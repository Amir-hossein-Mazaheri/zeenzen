import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@zeenzen/database';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import * as moment from 'moment';
import {
  DataSource,
  FindManyOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

import { RequestUser, UserRole } from '../types';
import { UserService } from '../user/user.service';
import { toCamelCase } from '../utils/toCamelCase';
import { CreateTicketInput } from './dto/create-ticket.input';
import { SendTicketMessageInput } from './dto/send-ticket-message.input';
import { TicketMessage } from './entities/ticket-message.entity';
import { Ticket } from './entities/ticket.entity';

const pubSub = new RedisPubSub();

const TICKET_ADDED = 'ticketAdded';

const TICKET_MESSAGE_ADDED = 'ticketMessageAdded';

@Injectable()
export class TicketsService {
  private readonly subscriptionsFindOptions:
    | Prisma.TicketFindManyArgs
    | Prisma.TicketMessageFindManyArgs = {
    take: 20,
    orderBy: {
      id: 'desc',
    },
  };

  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(TicketMessage)
    private readonly ticketMessageRepository: Repository<TicketMessage>,
    private readonly dataSource: DataSource,
    private readonly userService: UserService,
    private readonly prismaService: PrismaService
  ) {}

  getWhereOptions(user: RequestUser, id?: number) {
    // const whereOptions: Prisma.TicketWhereInput = {};

    // if (id) {
    //   whereOptions.id = id;
    // }

    // if (user.role !== UserRole.ADMIN) {
    //   whereOptions.whoAsked = { id: user.sub };
    // }

    // return whereOptions;

    const whereOptions: Prisma.TicketWhereInput = {};

    if (id) {
      whereOptions.id = id;
    }

    if (user.role !== UserRole.ADMIN) {
      whereOptions.user = { id: user.sub };
    }

    return whereOptions;
  }

  async validateTicket(id: number, user: RequestUser) {
    // const ticket = await this.ticketRepository.findOne({
    //   where: this.getWhereOptions(user, id),
    //   relations: {
    //     whoAsked: true,
    //     messages: {
    //       user: true,
    //     },
    //   },
    //   order: {
    //     messages: { sentAt: 'ASC' },
    //   },
    // });

    const ticket = await this.prismaService.ticket.findFirst({
      where: this.getWhereOptions(user, id),
      include: {
        user: true,
        ticketMessages: true,
      },
      orderBy: {},
    });

    if (!ticket) {
      throw new NotFoundException('Invalid ticket id.');
    }

    return ticket;
  }

  async publishTicketOnSubscription() {
    // const tickets = await this.ticketRepository.find(
    //   this.subscriptionsFindOptions
    // );

    const tickets = await this.prismaService.ticket.findMany(
      this.subscriptionsFindOptions as Prisma.TicketFindManyArgs
    );

    pubSub.publish(TICKET_ADDED, { tickets });
  }

  async publishTicketMessagesOnSubscription() {
    // const ticketMessageFindOptions: FindManyOptions = {
    //   ...this.subscriptionsFindOptions,
    //   relations: { user: true },
    // };

    // const ticketMessages = await this.ticketMessageRepository.find(
    //   ticketMessageFindOptions
    // );

    const ticketMessages = await this.prismaService.ticketMessage.findMany({
      ...(this.subscriptionsFindOptions as Prisma.TicketMessageFindManyArgs),
      include: {
        user: true,
      },
    });

    pubSub.publish(TICKET_MESSAGE_ADDED, { ticketMessages });
  }

  async create(
    { title, description, priority, topic }: CreateTicketInput,
    user: RequestUser
  ) {
    // const currUser = await this.userService.validateUser(user.sub);

    // const newTicket = new Ticket();
    // newTicket.title = title;
    // newTicket.description = description;
    // newTicket.priority = priority;
    // newTicket.topic = topic;
    // newTicket.whoAsked = currUser;

    // await this.ticketRepository.manager.save(newTicket);

    // await this.publishTicketOnSubscription();

    // return newTicket;

    const newTicket = await this.prismaService.ticket.create({
      data: {
        title,
        description,
        priority,
        topic,
      },
    });

    await this.publishTicketOnSubscription();

    return newTicket;
  }

  findAll() {
    return pubSub.asyncIterator(TICKET_ADDED);
  }

  async findAllTickets(user: RequestUser) {
    const whereOptions: Prisma.TicketWhereInput = {};

    if (user.role !== UserRole.ADMIN) {
      whereOptions.user = { id: user.sub };
    }

    // return await this.ticketRepository
    //   .createQueryBuilder('ticket')
    //   .where(whereOptions)
    //   .leftJoinAndSelect('ticket.messages', 'messages')
    //   .orderBy('messages', 'DESC', 'NULLS LAST')
    //   .getMany();

    return await this.prismaService.ticket.findMany({
      where: whereOptions,
      include: {
        ticketMessages: true,
      },
    });
  }

  async findOne(id: number, user: RequestUser) {
    return await this.validateTicket(id, user);
  }

  ticketMessages() {
    return pubSub.asyncIterator(TICKET_MESSAGE_ADDED);
  }

  async sendTicketMessage(
    { ticketId, message }: SendTicketMessageInput,
    user: RequestUser
  ) {
    // const ticket = await this.validateTicket(ticketId, user);
    // const currUser = await this.userService.validateUser(user.sub);

    const ticket = await this.validateTicket(ticketId, user);

    if (ticket.isClosed) {
      throw new NotAcceptableException(
        "This ticket is closed and you can't send new messages."
      );
    }

    const newTicketMessage = await this.prismaService.ticketMessage.create({
      data: {
        message,
        ticket: { connect: { id: ticket.id } },
        user: {
          connect: { id: user.sub },
        },
      },
    });

    await this.publishTicketMessagesOnSubscription();

    return newTicketMessage;

    // const newTicketMessage = new TicketMessage();
    // newTicketMessage.message = message;
    // newTicketMessage.ticket = ticket;
    // newTicketMessage.user = currUser;

    // await this.ticketMessageRepository.manager.save(newTicketMessage);

    // await this.publishTicketMessagesOnSubscription();

    // return newTicketMessage;
  }

  async closeTicket(id: number, user: RequestUser) {
    await this.validateTicket(id, user);

    const now = moment.utc().toLocaleString();

    // const ticket = await this.dataSource
    //   .createQueryBuilder()
    //   .update(Ticket)
    //   .set({ isClosed: true, closedAt: now })
    //   .where({ id })
    //   .returning('*')
    //   .execute();

    // return toCamelCase(ticket.raw[0]);

    return await this.prismaService.ticket.update({
      where: { id },
      data: {
        isClosed: true,
        closedAt: now,
      },
    });
  }
}
