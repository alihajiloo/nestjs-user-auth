import {
  Body,
  Controller,
  Inject,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { LoginRo } from './dto/login.ro';
import { TokenDto } from './dto/token.dto';
import { TokenRo } from './dto/token.ro';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { ErrorsInterceptor } from 'src/interceptors/errors.interceptor';

@ApiTags('Auth')
@Controller('auth')
@UseInterceptors(ErrorsInterceptor)
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOkResponse({
    description: 'The Token has been successfully generated.',
    type: LoginRo,
  })
  async login(@Body() loginDto: LoginDto): Promise<LoginRo> {
    return await this.authService.login(loginDto);
  }
}
