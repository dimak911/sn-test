import * as connectRedis from 'connect-redis';
import { createClient } from 'redis';
import * as session from 'express-session';
import { Injectable } from '@nestjs/common';
import { RedisStore } from 'connect-redis';
import { User } from '@src/user/entities/user.entity';
import { Profile } from '@src/profile/entities/profile.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CustomConfigService } from '@src/custom-config/custom-config.service';

@Injectable()
export class ConnectionConfigService {
  private readonly redisHost: string;
  private readonly redisPort: number;
  private readonly typeOrmSynchronize: boolean;
  private readonly postgresHost: string;
  private readonly postgresPort: number;
  private readonly postgresUser: string;
  private readonly postgresPassword: string;
  private readonly postgresDatabase: string;

  constructor(private readonly configService: CustomConfigService) {
    this.redisHost = this.configService.get<string>('REDIS_HOST');
    this.redisPort = this.configService.get<number>('REDIS_PORT');
    this.typeOrmSynchronize = this.configService.get<boolean>(
      'TYPE_ORM_SYNCHRONIZE'
    );
    this.postgresHost =
      this.configService.get<string>('POSTGRES_HOST');
    this.postgresPort =
      +this.configService.get<string>('POSTGRES_PORT');
    this.postgresUser =
      this.configService.get<string>('POSTGRES_USER');
    this.postgresPassword = this.configService.get<string>(
      'POSTGRES_PASSWORD'
    );
    this.postgresDatabase = this.configService.get<string>(
      'POSTGRES_DATABASE'
    );
  }

  public initRedisSession(): RedisStore {
    const redisClient = createClient({
      host: this.redisHost,
      port: this.redisPort,
    });

    const redisStore = connectRedis(session);

    return new redisStore({
      client: redisClient,
    });
  }

  public initTypeOrmConnection(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.postgresHost,
      port: this.postgresPort,
      username: this.postgresUser,
      password: this.postgresPassword,
      database: this.postgresDatabase,
      entities: [User, Profile],
      synchronize: this.typeOrmSynchronize,
    };
  }
}
