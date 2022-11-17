import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CronExpression } from '@nestjs/schedule/dist';

import { CartService } from '../cart/cart.service';

@Injectable()
export class TasksService {
  constructor(private cartService: CartService) {}

  private readonly logger = new Logger(TasksService.name);

  @Cron(CronExpression.EVERY_WEEKEND)
  async cleanCartDatabase() {
    this.logger.log(
      'announcing that this is the time that user less carts will be deleted soon.'
    );
  }
}
