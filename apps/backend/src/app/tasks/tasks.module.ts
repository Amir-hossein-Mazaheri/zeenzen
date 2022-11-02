import { Module } from '@nestjs/common';

import { CartModule } from '../cart/cart.module';
import { TasksService } from './tasks.service';

@Module({
  imports: [CartModule],
  providers: [TasksService],
})
export class TasksModule {}
