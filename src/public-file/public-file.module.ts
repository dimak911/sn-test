import { Module } from '@nestjs/common';
import { PublicFileService } from './public-file.service';
import { PublicFileController } from './public-file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicFile } from '@src/public-file/entities/public-file.entity';
import { MinioClientModule } from '@src/minio-client/minio-client.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PublicFile]),
    MinioClientModule,
  ],
  controllers: [PublicFileController],
  providers: [PublicFileService],
  exports: [PublicFileService],
})
export class PublicFileModule {}
