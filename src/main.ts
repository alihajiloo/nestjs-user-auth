import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configService } from './config.service';
import { WinstonModule, WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const winstonLogger = WinstonModule.createLogger(
    configService.getWinstonConfig(),
  );

  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
    },
    logger: winstonLogger,
  });

  app.setGlobalPrefix('api/v1');

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API description')
    .setVersion('0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.listen(configService.getPort(), () =>
    winstonLogger.debug(
      `Api GateWay is Listening on Port: ${configService.getPort()}`,
    ),
  );
}

bootstrap();
