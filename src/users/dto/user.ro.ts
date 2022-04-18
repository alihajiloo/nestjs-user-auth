import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class UserRo {
  @ApiProperty()
  @IsString()
  @Expose()
  public readonly id: string;

  @ApiProperty()
  @IsString()
  @Expose()
  public readonly mobile: string;

  @ApiProperty()
  @IsString()
  @Expose()
  public readonly name: string;

  @ApiProperty()
  @IsString()
  @Expose()
  public readonly age: string;
}
