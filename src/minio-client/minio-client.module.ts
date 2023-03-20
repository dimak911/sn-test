import { Module } from '@nestjs/common';
import { MinioClientService } from '@src/minio-client/minio-client.service';
import { CustomConfigModule } from '@src/custom-config/custom-config.module';

@Module({
  imports: [CustomConfigModule],
  providers: [MinioClientService],
  exports: [MinioClientService],
})
export class MinioClientModule {}
