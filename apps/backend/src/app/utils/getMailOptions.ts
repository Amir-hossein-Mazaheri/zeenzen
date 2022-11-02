import Mail from 'nodemailer/lib/mailer';

import configuration from '../config/configuration';

export function getMailOptions(
  to: string,
  subject: string,
  html: string
): Mail.Options {
  const { email } = configuration();

  return {
    from: email.user,
    to,
    subject,
    html,
  };
}
