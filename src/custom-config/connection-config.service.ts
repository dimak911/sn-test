import * as connectRedis from 'connect-redis';
import { createClient } from 'redis';
import * as session from 'express-session';
import { Injectable } from '@nestjs/common';
import { RedisStore } from 'connect-redis';
import { User } from '@src/user/entities/user.entity';
import { Profile } from '@src/profile/entities/profile.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CustomConfigService } from '@src/custom-config/custom-config.service';
import { PublicFile } from '@src/public-file/entities/public-file.entity';
import { ClientOptions } from 'minio';

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

  private readonly minIoEndpoint: string;
  private readonly minIoPort: number;
  private readonly minIoRootUser: string;
  private readonly minIoRootPassword: string;
  private readonly minIoUseSsl: string;

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

    this.minIoEndpoint =
      this.configService.get<string>('MINIO_ENDPOINT');
    this.minIoPort = this.configService.get<number>('MINIO_PORT');
    this.minIoRootUser =
      this.configService.get<string>('MINIO_ROOT_USER');
    this.minIoRootPassword = this.configService.get<string>(
      'MINIO_ROOT_PASSWORD'
    );
    this.minIoUseSsl =
      this.configService.get<string>('MINIO_USE_SSL');
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
      entities: [User, Profile, PublicFile],
      synchronize: this.typeOrmSynchronize,
    };
  }

  public initMinIoConnection(): ClientOptions {
    return {
      endPoint: this.minIoEndpoint,
      port: Number(this.minIoPort),
      useSSL: this.minIoUseSsl === 'true',
      accessKey: this.minIoRootUser,
      secretKey: this.minIoRootPassword,
    };
  }
}
