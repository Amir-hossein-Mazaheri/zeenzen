import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import configuration from '../config/configuration';

export function getEmailTransporter() {
  const {
    email: { user, pass, port, host },
  } = configuration();

  console.log(user, pass, port, host);

  const transportOptions: SMTPTransport.Options = {
    host,
    auth: {
      user,
      pass,
    },
  };

  if (port) {
    transportOptions.port = +port;
  }

  return nodemailer.createTransport(transportOptions);
}
