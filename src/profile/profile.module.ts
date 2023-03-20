import { Global, Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from '@src/profile/entities/profile.entity';
import { PublicFileModule } from '@src/public-file/public-file.module';
import { MinioClientModule } from '@src/minio-client/minio-client.module';
import { ProfileRepository } from '@src/profile/repositories/profile.repository';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Profile]),
    PublicFileModule,
    MinioClientModule,
  ],
  controllers: [ProfileController],
  providers: [ProfileService, ProfileRepository],
  exports: [ProfileService],
})
export class ProfileModule {}
