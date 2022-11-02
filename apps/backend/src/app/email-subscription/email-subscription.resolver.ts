import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SubscribeInput } from './dto/subscribe.input';

import { EmailSubscriptionService } from './email-subscription.service';
import { EmailSubscription } from './entities/email-subscription.entity';

@Resolver(() => EmailSubscription)
export class EmailSubscriptionResolver {
  constructor(
    private readonly emailSubscriptionService: EmailSubscriptionService
  ) {}

  @Mutation(() => EmailSubscription, {
    description: 'add email to subscribers list.',
  })
  subscribe(@Args('subscribeInput') subscribeInput: SubscribeInput) {
    return this.emailSubscriptionService.subscribe(subscribeInput.email);
  }
}
