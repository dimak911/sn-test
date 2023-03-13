import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { CustomConfigModule } from '@src/custom-config/custom-config.module';

@Module({
  providers: [MailService],
  exports: [MailService],
  imports: [CustomConfigModule],
})
export class MailModule {}
