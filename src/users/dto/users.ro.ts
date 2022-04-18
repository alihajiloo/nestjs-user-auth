import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { UserRo } from './user.ro';

export class UsersRo {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserRo)
  public readonly usersRo: UserRo[];
}
