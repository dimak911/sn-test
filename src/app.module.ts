import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProfileModule } from '@src/profile/profile.module';
import { UserModule } from '@src/user/user.module';
import { AuthModule } from '@src/auth/auth.module';
import { MailModule } from '@src/mail/mail.module';
import { CustomConfigModule } from '@src/custom-config/custom-config.module';
import { ConnectionConfigService } from '@src/custom-config/connection-config.service';
import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import { PublicFileModule } from '@src/public-file/public-file.module';
import { MinioClientModule } from './minio-client/minio-client.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    CustomConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [CustomConfigModule],
      inject: [ConnectionConfigService],
      useFactory: (
        connectionConfigService: ConnectionConfigService
      ) => {
        return connectionConfigService.initTypeOrmConnection();
      },
    }),
    ProfileModule,
    UserModule,
    AuthModule,
    MailModule,
    PublicFileModule,
    MinioClientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
