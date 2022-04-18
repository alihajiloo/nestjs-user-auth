import { IsString } from 'class-validator';

export class UsernameDto {
  @IsString()
  public readonly username: string;
}
