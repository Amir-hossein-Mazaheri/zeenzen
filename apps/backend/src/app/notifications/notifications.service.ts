import { Injectable, NotFoundException } from '@nestjs/common';
import { NotificationAction, Prisma } from '@prisma/client';
import { PrismaService } from '@zeenzen/database';
import { RedisPubSub } from 'graphql-redis-subscriptions';

import { RequestUser } from '../types';
import { createNotificationInput } from './dto/create-notification.input';

export const adminNotificationPubSub = new RedisPubSub();
export const notificationPubSub = new RedisPubSub();

const ADD_ADMIN_NOTIFICATION = 'add-admin-notification';

const ADD_NOTIFICATION = 'add-notification';

@Injectable()
export class NotificationsService {
  constructor(private readonly prismaService: PrismaService) {}

  validateNotification(id: string) {
    return async (whereOptions?: Prisma.NotificationWhereInput) => {
      const notification = await this.prismaService.notification.findFirst({
        where: {
          id,
          ...whereOptions,
        },
      });

      if (!notification) {
        throw new NotFoundException('Invalid notification id.');
      }

      return notification;
    };
  }

  async findAll() {
    return await this.prismaService.notification.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    return await this.validateNotification(id)();
  }

  pullNotification() {
    return adminNotificationPubSub.asyncIterator(ADD_ADMIN_NOTIFICATION);
  }

  pullUserRelatedNotification() {
    return notificationPubSub.asyncIterator(ADD_NOTIFICATION);
  }

  async findAllUserRelated(user: RequestUser) {
    return await this.prismaService.notification.findMany({
      where: {
        user: {
          id: user.sub,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOneUserRelated(id: string, user: RequestUser) {
    return await this.validateNotification(id)({
      user: {
        id: user.sub,
      },
    });
  }

  pushNotification(
    message: string,
    action: NotificationAction,
    user: RequestUser | { sub: number },
    transaction?: Prisma.TransactionClient,
    manual = false
  ) {
    return async (forAdmin = false) => {
      const notification = await (
        transaction ?? this.prismaService
      ).notification.create({
        data: {
          message,
          action,
          manual,

          user: {
            connect: {
              id: user.sub,
            },
          },
        },
      });

      (forAdmin ? adminNotificationPubSub : notificationPubSub).publish(
        ADD_ADMIN_NOTIFICATION,
        notification
      );

      return notification;
    };
  }

  async createNotification({
    message,
    action,
    usersId,
  }: createNotificationInput) {
    return await this.prismaService.$transaction(async (tx) => {
      const notifications = [];

      for (const userId of usersId) {
        const notification = await this.pushNotification(
          message,
          action,
          {
            sub: userId,
          },
          tx,
          true
        )();

        notifications.push(notification);
      }

      return notifications;
    });
  }

  async remove(id: string) {
    return await this.prismaService.notification.delete({
      where: {
        id,
      },
    });
  }
}
