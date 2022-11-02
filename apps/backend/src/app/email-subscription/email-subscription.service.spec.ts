import { Test, TestingModule } from '@nestjs/testing';
import { EmailSubscriptionService } from './email-subscription.service';

describe('EmailSubscriptionService', () => {
  let service: EmailSubscriptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailSubscriptionService],
    }).compile();

    service = module.get<EmailSubscriptionService>(EmailSubscriptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
