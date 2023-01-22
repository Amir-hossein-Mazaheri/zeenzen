import { Payment } from './payment.entity';

export class PaymentTrack {
  id: number;

  idPayTrackId: number;

  trackId: string;

  cardNumber: string;

  hashedCardNumber: string;

  paidDate: Date;

  verificationDate: Date;

  payment: Payment;
}
