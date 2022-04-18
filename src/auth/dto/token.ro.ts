import { IsString, IsNotEmpty } from 'class-validator';

export class TokenRo {
  @IsNotEmpty()
  @IsString()
  public mobile: string;
}
