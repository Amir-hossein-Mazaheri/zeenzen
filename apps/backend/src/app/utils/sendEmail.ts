import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import { getEmailTransporter } from './getEmailTransporter';

// promisified nodemailer sendEmail method
export function sendEmail(mailOption: Mail.Options) {
  return new Promise<SMTPTransport.SentMessageInfo>((resolve, reject) => {
    getEmailTransporter().sendMail(mailOption, (err, info) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(info);
    });
  });
}
