import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserRo } from '../users/dto/user.ro';
import { configService } from 'src/config.service';
import { plainToClass } from 'class-transformer';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {
    super();
  }

  async validate(username: string, password: string): Promise<UserRo> {
    console.log('mob:' + username + '  password:' + password);
    const superUser = configService.getSuperUser();
    if (username === superUser.mobile && password === superUser.password) {
      return plainToClass(UserRo, {
        mobile: superUser.mobile,
        name: 'admin',
        age: '23',
      });
    }

    return await this.usersService.validate(username, password);
    // try {
    //   return await this.usersService.validate(mobile, password);
    // } catch (error) {
    //   this.logger.error(error);
    //   // throw new RpcException({
    //   //   payload: error,
    //   //   code: grpcStatus.UNAUTHENTICATED,
    //   //   message: error.message, //? this message comes from users.service.
    //   // });
    //   throw new UnauthorizedException({
    //     message: error.message,
    //   });
    // }
  }
}
