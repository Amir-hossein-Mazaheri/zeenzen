import { getPaymentDriver, IdPay } from 'monopay';

import configuration from '../config/configuration';

export function getIDPayDriver() {
  const { paymentToken } = configuration();

  return getPaymentDriver<IdPay>('idpay', {
    apiKey: paymentToken,
    sandbox: true,
  });
}
