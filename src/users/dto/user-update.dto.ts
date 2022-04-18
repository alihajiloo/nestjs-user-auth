import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UserUpdateDto {
  @IsNotEmpty()
  @IsString()
  public readonly username: string;

  @IsString()
  public readonly firstName: string;

  @IsString()
  public readonly lastName: string;

  @IsString()
  @Length(10, 10, { message: 'NationalId Wrong Size' })
  public readonly nationalId: string;
}
