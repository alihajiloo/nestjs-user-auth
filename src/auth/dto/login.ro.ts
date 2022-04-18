import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, ValidateNested } from 'class-validator';

export class LoginRo {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public token: string;
}
