import { Module } from '@nestjs/common';
import { DatabaseModule } from '@zeenzen/database';

import { EmailSubscriptionService } from './email-subscription.service';
import { EmailSubscriptionResolver } from './email-subscription.resolver';

@Module({
  imports: [DatabaseModule],
  providers: [EmailSubscriptionService, EmailSubscriptionResolver],
})
export class EmailSubscriptionModule {}
