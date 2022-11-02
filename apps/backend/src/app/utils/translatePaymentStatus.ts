import { PaymentStatusCode } from '../types';

export function translatePaymentStatus(status: number | string) {
  const numericStatus = +status;

  return PaymentStatusCode[numericStatus] as unknown as PaymentStatusCode;
}
