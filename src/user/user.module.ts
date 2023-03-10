import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@src/user/entities/user.entity';
import { ProfileModule } from '@src/profile/profile.module';
import { MailModule } from '@src/mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ProfileModule,
    MailModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'SECRET',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
