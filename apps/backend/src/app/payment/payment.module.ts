import { Module } from '@nestjs/common';
import { DatabaseModule } from '@zeenzen/database';

import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { OrderModule } from '../order/order.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule, OrderModule, DatabaseModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
