import type { RedisClientOptions } from 'redis';
import { CacheModule, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { ProfileModule } from './profile/profile.module';
import { UserModule } from './user/user.module';
import { Profile } from './profile/entities/profile.entity';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [User, Profile],
      synchronize: true,
    }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      isGlobal: true,
    }),
    ProfileModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

