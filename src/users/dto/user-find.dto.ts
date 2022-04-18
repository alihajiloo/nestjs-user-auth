import { IsOptional, IsString, Length } from 'class-validator';

export class UserFindDto {
  @IsOptional()
  @IsString()
  public readonly username: string;

  @IsOptional()
  @IsString()
  public readonly firstName: string;

  @IsOptional()
  @IsString()
  public readonly lastName: string;

  @IsOptional()
  @IsString()
  @Length(10, 10, { message: 'NationalId Wrong Size' })
  public readonly nationalId: string;
}
