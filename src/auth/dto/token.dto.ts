import { IsString, IsNotEmpty } from 'class-validator';

export class TokenDto {
  @IsNotEmpty()
  @IsString()
  public token: string;
}

export default TokenDto;
