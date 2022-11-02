import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EmailSubscription } from './entities/email-subscription.entity';

@Injectable()
export class EmailSubscriptionService {
  constructor(
    @InjectRepository(EmailSubscription)
    private readonly emailSubscriptionRepository: Repository<EmailSubscription>,
  ) {}

  async subscribe(email: string) {
    await this.preventsDuplicateEmail(email);

    const newEmailSubscription = new EmailSubscription();
    newEmailSubscription.email = email;

    await this.emailSubscriptionRepository.manager.save(newEmailSubscription);

    return newEmailSubscription;
  }

  async preventsDuplicateEmail(email: string) {
    if (!(await this.emailSubscriptionRepository.findOneBy({ email }))) {
      throw new BadRequestException('Email already exists.');
    }
  }
}
