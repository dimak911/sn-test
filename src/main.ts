import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';
import { AppModule } from './app.module';
import { ConnectionConfigService } from '@src/custom-config/connection-config.service';
import { CustomConfigService } from '@src/custom-config/custom-config.service';
import { ValidationPipe } from '@src/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(CustomConfigService);
  const COOKIE_MAX_AGE = eval(config.get<string>('COOKIE_MAX_AGE'));
  const PORT = config.get<number>('PORT');
  const connectionConfig = app.get(ConnectionConfigService);
  const REDIS_SECRET = config.get<string>('REDIS_SECRET');
  const APP_URL = config.get<string>('APP_URL');

  app.use(cookieParser(REDIS_SECRET));
  app.enableCors({
    origin: APP_URL,
    credentials: true,
  });

  app.use(
    session({
      secret: REDIS_SECRET,
      store: connectionConfig.initRedisSession(),
      cookie: {
        httpOnly: true,
        maxAge: COOKIE_MAX_AGE,
        secure: false,
      },
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT);
}

bootstrap();
