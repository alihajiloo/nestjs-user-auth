import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

import * as dotenv from 'dotenv';
import { winstonConsole } from './factory/winston.config';
dotenv.config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }
    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return +this.getValue('HTTP_PORT', true);
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',

      host: this.getValue('DB_HOST'),
      port: +this.getValue('DB_PORT'),
      username: this.getValue('DB_USER'),
      password: this.getValue('DB_PASS'),
      database: this.getValue('DB_NAME'),

      entities: ['dist/**/*.entity.js'],

      migrationsTableName: 'migration',

      migrations: ['src/migration/*.ts'],

      cli: {
        migrationsDir: 'src/migration',
      },

      synchronize: true,
      logging: false,
    };
  }

  public getJwtConfig() {
    return {
      secret: this.getValue('JWT_SECRET', true),
      signOptions: {
        expiresIn: this.getValue('JWT_EXPIRE_IN', false) || '60m',
      },
    };
  }

  public getSuperUser() {
    return {
      mobile: this.getValue('SUPERUSER_USERNAME'),
      password: this.getValue('SUPERUSER_PASSWORD'),
    };
  }

  public getWinstonConfig() {
    return winstonConsole();
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'HTTP_PORT',
  'DB_HOST',
  'DB_PORT',
  'DB_USER',
  'DB_PASS',
  'DB_NAME',
  'JWT_SECRET',
  'JWT_EXPIRE_IN',
  'SUPERUSER_USERNAME',
  'SUPERUSER_PASSWORD',
]);

export { configService };
