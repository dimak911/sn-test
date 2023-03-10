import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class MailService {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  public sendVerificationEmail(email: string, token: string) {
    const msg = {
      to: email,
      from: process.env.SENDGRID_SENDER,
      subject: 'Verify your email',
      html: `Click <a href="${process.env.APP_URL}/user/verify/${token}"><strong>here</strong></a> to verify your email`,
    };

    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent');
      })
      .catch((error) => {
        console.error(error.response.body);
      });
  }
}
