import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Payment } from './payment.entity';

@Entity()
export class PaymentTrack {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('bigint')
  idPayTrackId: number;

  @Column('text')
  trackId: string;

  @Column()
  cardNumber: string;

  @Column()
  hashedCardNumber: string;

  @Column('date')
  paidDate: Date;

  @Column('date')
  verificationDate: Date;

  @OneToOne(() => Payment, (payment) => payment.paymentTrack)
  payment: Payment;
}
