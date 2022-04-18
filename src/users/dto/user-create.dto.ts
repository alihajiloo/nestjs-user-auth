import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Matches,
  Max,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public readonly name: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z])[^\s]{8,20}$/, {
    message:
      'password too weak must have a Lowercase & Uppercase & Number character',
  })
  @ApiProperty()
  password: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z])[^\s]{8,20}$/, {
    message:
      'rePassword too weak must have a Lowercase & Uppercase & Number character',
  })
  @ApiProperty()
  rePassword: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  @Max(80)
  public readonly age: number;

  @IsNotEmpty()
  @IsString()
  @Length(11, 11, { message: 'Mobile Wrong Size' })
  @Matches(/(\+98|0)?9\d{9}/, {
    message:
      'Mobile Number is not valid format: should start with 09 and 11 char length',
  })
  @ApiProperty()
  public readonly mobile: string;
}
