import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class UserCreateRo {
  @ApiProperty()
  @IsString()
  @Expose()
  public readonly id: string;

  @ApiProperty()
  @IsString()
  @Expose()
  public readonly mobile: string;
}
