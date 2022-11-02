import { Test, TestingModule } from '@nestjs/testing';
import { EmailSubscriptionResolver } from './email-subscription.resolver';

describe('EmailSubscriptionResolver', () => {
  let resolver: EmailSubscriptionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailSubscriptionResolver],
    }).compile();

    resolver = module.get<EmailSubscriptionResolver>(EmailSubscriptionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
