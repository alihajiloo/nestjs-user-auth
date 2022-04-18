import { Injectable, NestMiddleware, Inject } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, path: url, body } = request;
    const userAgent = request.get('user-agent') || '';
    const start = new Date().getMilliseconds();

    response.on('close', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      this.logger.http(
        `${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip} - ${
          new Date().getMilliseconds() - start
        }ms `,
        { body },
      );
    });

    next();
  }
}
