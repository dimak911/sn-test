import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConnectionConfigService } from '@src/custom-config/connection-config.service';
import { CustomConfigService } from '@src/custom-config/custom-config.service';

@Module({
  imports: [ConfigModule],
  providers: [ConnectionConfigService, CustomConfigService],
  exports: [ConnectionConfigService, CustomConfigService],
})
export class CustomConfigModule {}
