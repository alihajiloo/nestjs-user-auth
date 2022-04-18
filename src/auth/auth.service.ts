import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginRo } from './dto/login.ro';
import TokenDto from './dto/token.dto';
import { TokenRo } from './dto/token.ro';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(loginDto: LoginDto): Promise<LoginRo> {
    const { username } = loginDto;
    return {
      token: await this.jwtService.signAsync({ username }),
    };
  }

  async validateToken(tokenDto: TokenDto): Promise<TokenRo> {
    try {
      const user = await this.jwtService.verifyAsync(tokenDto.token);
      return {
        mobile: user.username,
      };
    } catch (error) {
      throw new UnauthorizedException({
        message: 'Your token is not valid.',
      });
    }
  }
}
