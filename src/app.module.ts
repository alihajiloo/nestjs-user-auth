import { TypeOrmModule } from '@nestjs/typeorm';

import { MiddlewareConsumer, Module } from '@nestjs/common';
import { configService } from './config.service';
import { AuthModule } from './auth/auth.module';
import { WinstonModule } from 'nest-winston';
import { AppLoggerMiddleware } from './middlewares/app-logger.middleware';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    WinstonModule.forRoot(configService.getWinstonConfig()),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    AuthModule,
    UsersModule
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
