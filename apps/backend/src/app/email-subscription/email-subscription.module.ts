import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmailSubscriptionService } from './email-subscription.service';
import { EmailSubscriptionResolver } from './email-subscription.resolver';
import { EmailSubscription } from './entities/email-subscription.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmailSubscription])],
  providers: [EmailSubscriptionService, EmailSubscriptionResolver],
})
export class EmailSubscriptionModule {}
