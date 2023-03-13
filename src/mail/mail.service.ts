import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import { CustomConfigService } from '@src/custom-config/custom-config.service';

@Injectable()
export class MailService {
  constructor(private readonly configService: CustomConfigService) {
    sgMail.setApiKey(
      this.configService.get<string>('SENDGRID_API_KEY')
    );
  }

  public sendVerificationEmail(email: string, token: string) {
    const msg = {
      to: email,
      from: this.configService.get<string>('SENDGRID_SENDER'),
      subject: 'Verify your email',
      html: `Click <a href="${this.configService.get<string>(
        'APP_URL'
      )}/verify/${token}" target="_blank"><strong>here</strong></a> to verify your email`,
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
