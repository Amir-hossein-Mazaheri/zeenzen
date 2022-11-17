import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { DataSource, IsNull, Repository } from 'typeorm';
import { RequestException } from 'monopay';

import { GetPaymentCodeDTO } from './dto/get-payment-code.dto';
import { Payment } from './entities/payment.entity';
import { VerifyPaymentDTO } from './dto/verify-payment.dto';
import { PaymentTrack } from './entities/payment-track';
import { LogsService } from '../logs/logs.service';
import { OrderService } from '../order/order.service';
import { PaymentStatusCode, RequestUser, PaymentStatus } from '../types';
import { UserService } from '../user/user.service';
import { getIDPayDriver } from '../utils/getIDPayDriver';
import { getUrl } from '../utils/getUrl';
import { translatePaymentStatus } from '../utils/translatePaymentStatus';
import { PrismaService } from '@zeenzen/database';

@Injectable()
export class PaymentService {
  constructor(
    // @InjectRepository(Payment)
    // private readonly paymentRepository: Repository<Payment>,
    // @InjectRepository(PaymentTrack)
    // private readonly paymentTrackRepository: Repository<PaymentTrack>,
    // private readonly dataSource: DataSource
    private readonly logsService: LogsService,
    private readonly orderService: OrderService,
    private readonly userService: UserService,
    private readonly prismaService: PrismaService
  ) {}

  async validatePayment(paymentId: string) {
    // const payment = await this.paymentRepository.findOne({
    //   where: { paymentId, paymentTrack: IsNull() },
    // });
    const payment = await this.prismaService.payment.findFirst({
      where: {
        paymentId,
        paymentTrack: {
          NOT: null,
        },
      },
    });

    if (!payment) {
      throw new NotFoundException('Invalid payment id.');
    }

    return payment;
  }

  async isPaymentVerified(
    status: number,
    id: string,
    amount: number,
    verifyPaymentDto: VerifyPaymentDTO
  ) {
    const eStatus = translatePaymentStatus(status);

    try {
      const result = await getIDPayDriver().verifyPayment(
        {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          referenceId: id,
          amount,
        },
        verifyPaymentDto
      );

      console.log(result);

      return (
        (eStatus === PaymentStatusCode.VERIFIED ||
          eStatus === PaymentStatusCode.VERIFIED_EARLIER) &&
        result
      );
    } catch (err) {
      console.log(err?.message);

      return false;
    }
  }

  async afterPaymentValidation(
    card_no: string,
    orderId: number,
    user: RequestUser
  ) {
    // TODO: fix payment track data
    return await this.prismaService.$transaction(async (tx) => {
      await tx.paymentTrack.create({
        data: {
          cardNumber: card_no,
          hashedCardNumber: '',
          trackId: '',
          idpayTrackId: 5568,
          paidDate: '',
          verificationDate: '',
        },
      });

      await this.orderService.orderSucceeded(orderId, user, tx);
    });

    // const queryRunner = this.dataSource.createQueryRunner();
    // await queryRunner.connect();
    // await queryRunner.startTransaction();
    // try {
    //   const newPaymentTrack = new PaymentTrack();
    //   newPaymentTrack.cardNumber = card_no;
    //   newPaymentTrack.hashedCardNumber;
    //   await this.orderService.orderSucceeded(orderId, user, queryRunner);
    //   await queryRunner.manager.save(newPaymentTrack);
    //   await queryRunner.release();
    // } catch (err) {
    //   await queryRunner.rollbackTransaction();
    //   await this.logsService.logError('afterPaymentValidation', err);
    //   throw new InternalServerErrorException(
    //     'Something went wrong. error: ' + err?.message
    //   );
    // } finally {
    //   await queryRunner.release();
    // }
  }

  async verify(verifyPaymentDto: VerifyPaymentDTO) {
    // TODO: fix functionality of this after deployment
    const { id, status, amount, card_no } = verifyPaymentDto;

    const payment = await this.validatePayment(id);

    const isPaymentVerified = this.isPaymentVerified(
      status,
      id,
      amount,
      verifyPaymentDto
    );

    // if (isPaymentVerified) {
    // }

    console.log(verifyPaymentDto);

    console.log(payment);
  }

  findAll() {
    return `This action returns all payment`;
  }

  findOne(id: string) {
    return `This action returns a #${id} payment`;
  }

  async connectToIDPayGate(
    { orderId }: GetPaymentCodeDTO,
    req: Request,
    user: RequestUser,
    amount: string,
    description?: string
  ) {
    return await this.prismaService.$transaction(async (tx) => {
      const currUser = await this.userService.validateUser(
        user.sub,
        false,
        false,
        tx
      );

      await this.orderService.validateOrder(orderId, user, tx);

      const paymentInfo = await getIDPayDriver().requestPayment({
        amount: +amount,
        callbackUrl: getUrl(req) + '/payment/verify',
        description,
        email: currUser.email,
        name: currUser.firstname + ' ' + currUser.lastname,
      });

      const newPayment = await tx.payment.create({
        data: {
          paymentId: paymentInfo.referenceId.toString(),
          status: PaymentStatus.PENDING,
          amount,

          user: {
            connect: currUser,
          },
        },
      });

      return {
        ...paymentInfo,
        payment: newPayment,
      };
    });

    // try {
    //   const currUser = await this.userService.validateUser(user.sub);
    //   // const order = await this.orderService.validateOrder(orderId, user);
    //   const paymentInfo = await getIDPayDriver().requestPayment({
    //     amount: +amount,
    //     callbackUrl: getUrl(req) + '/payment/verify',
    //     description,
    //     email: currUser.email,
    //     name: currUser.firstname + ' ' + currUser.lastname,
    //   });
    //   const newPayment = new Payment();
    //   newPayment.paymentId = paymentInfo.referenceId.toString();
    //   newPayment.user = currUser;
    //   newPayment.status = PaymentStatus.PENDING;
    //   newPayment.amount = amount;
    //   // newPayment.order = order;
    //   await this.paymentRepository.manager.save(newPayment);
    //   const { user: _, ...data } = newPayment;
    //   return { ...paymentInfo, payment: data };
    // } catch (err) {
    //   await this.logsService.logError('connectToIDPayGate', err);
    //   let message;
    //   if (err instanceof RequestException) {
    //     message =
    //       'Something went wrong while trying to connect to IDPay payment gate.';
    //   } else {
    //     message = 'Something went wrong. error:' + err.message;
    //   }
    //   throw new InternalServerErrorException(message);
    // }
  }

  //Todo: after deploying website implement ZarinPal Gate
  async connectToZarinPalGate() {
    return;
  }

  //Todo: after deploying website implement ZarinPal Gate
  async connectToPayPingGate() {
    return;
  }
}
