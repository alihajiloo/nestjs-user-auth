import {
  CanActivate,
  ExecutionContext,
  Inject,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { AuthService } from 'src/auth/auth.service';

export class AuthGuard implements CanActivate {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @Inject(AuthService) private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const prefix = 'Bearer ';
    const authToken = req.headers['authorization'];

    if (!authToken || !authToken.includes(prefix)) {
      const error = new UnauthorizedException('You are not logged in.');
      this.logger.error(error);
      throw error;
    }

    const token = authToken.slice(authToken.indexOf(' ') + 1);
    let user;
    try {
      user = await this.authService.validateToken({ token });
    } catch (error) {
      this.logger.error(error);
      throw new UnauthorizedException(error.details);
    }

    req.headers['user'] = user;
    return true;
  }
}
