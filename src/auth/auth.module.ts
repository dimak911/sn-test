import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { AuthSerializer } from './serialization.provider';
import { UserModule } from '@src/user/user.module';

@Global()
@Module({
  imports: [
    PassportModule.register({
      session: true,
    }),
    UserModule,
  ],
  providers: [AuthService, LocalStrategy, AuthSerializer],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
