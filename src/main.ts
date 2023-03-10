import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as connectRedis from 'connect-redis';
import * as passport from 'passport';
import { createClient } from 'redis';
import { AppModule } from './app.module';

const PORT = process.env.PORT;

const redisClient = createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const redisStore = connectRedis(session);

export const sessionStore = new redisStore({ client: redisClient });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser(process.env.REDIS_SECRET));

  const cookieMaxAge = 7 * 24 * 60 * 60 * 1000; // 7 days

  app.use(
    session({
      secret: process.env.REDIS_SECRET,
      store: sessionStore,
      cookie: {
        httpOnly: true,
        maxAge: cookieMaxAge,
        secure: false,
      },
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(PORT);
}
bootstrap();
