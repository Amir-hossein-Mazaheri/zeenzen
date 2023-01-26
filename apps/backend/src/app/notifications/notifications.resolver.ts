import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';

import { RequestUser, UserRole } from '../types';
import { Roles } from '../user/decorators/roles.decorator';
import { GetUser } from '../user/decorators/user.decorator';
import { createNotificationInput } from './dto/create-notification.input';
import { NotificationEntity } from './entities/notification.entity';
import { NotificationsService } from './notifications.service';

@Roles(UserRole.CUSTOMER)
@Resolver(() => NotificationEntity)
export class NotificationsResolver {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Roles(UserRole.ADMIN)
  @Query(() => [NotificationEntity], {
    name: 'notifications',
    description: 'returns notifications to admin.',
  })
  findAll() {
    return this.notificationsService.findAll();
  }

  @Roles(UserRole.ADMIN)
  @Query(() => NotificationEntity, {
    name: 'notification',
    description: 'returns one notification to admin.',
  })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.notificationsService.findOne(id);
  }

  @Subscription(() => NotificationEntity, {
    name: 'getNotification',
    description: 'live notification pusher.',
  })
  pullNotification() {
    return this.pullNotification();
  }

  @Subscription(() => NotificationEntity, {
    name: 'getUserRelatedNotification',
    description: 'live notification pusher for user.',
  })
  pullUserRelatedNotification() {
    return this.pullUserRelatedNotification();
  }

  @Query(() => [NotificationEntity], {
    name: 'notificationsUserRelated',
    description: 'returns notifications.',
  })
  findAllUserRelated(@GetUser() user: RequestUser) {
    return this.notificationsService.findAllUserRelated(user);
  }

  @Query(() => [NotificationEntity], {
    name: 'notificationUserRelated',
    description: 'returns one notification.',
  })
  findOneUserRelated(
    @Args('id', { type: () => String }) id: string,
    @GetUser() user: RequestUser
  ) {
    return this.notificationsService.findOneUserRelated(id, user);
  }

  @Roles(UserRole.ADMIN)
  @Mutation(() => [NotificationEntity], {
    description: 'creates notification manually.',
  })
  createNotification(
    @Args('createNotificationInput')
    createNotificationInput: createNotificationInput
  ) {
    return this.notificationsService.createNotification(
      createNotificationInput
    );
  }

  @Roles(UserRole.ADMIN)
  @Mutation(() => NotificationEntity, {
    description: 'removes single notification.',
  })
  removeNotification(@Args('id', { type: () => String }) id: string) {
    return this.notificationsService.remove(id);
  }
}
