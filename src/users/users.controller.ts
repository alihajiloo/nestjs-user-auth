import { UsersService } from './users.service';
import { UserCreateDto } from './dto/user-create.dto';
import { UserRo } from './dto/user.ro';
import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { ErrorsInterceptor } from 'src/interceptors/errors.interceptor';
import { UserCreateRo } from './dto/user-create.ro';
import { UserIdDto } from './dto/userId.dto';

@ApiTags('User')
@Controller('user')
@UseInterceptors(ErrorsInterceptor)
export class UsersController {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
    type: UserRo,
  })
  async create(@Body() userCreateDto: UserCreateDto): Promise<UserCreateRo> {
    const response = await this.usersService.create(userCreateDto);
    return response;
  }

  @Get()
  @ApiOkResponse()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async getUser(@Query() userIdDto: UserIdDto): Promise<UserRo> {
    return await this.usersService.getUser(userIdDto);
  }
}
