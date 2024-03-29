import { UserDto } from '@melomaniapp/contracts/user';

import { UserId, Username } from '../../domain';
import { Email } from '../../domain/model/email';

export const USER_FINDER = 'USER_FINDER';

export interface IUserFinder {
  findAll(): Promise<UserDto[]>;
  find(id: UserId): Promise<UserDto>;
  findOneByUsername(username: Username): Promise<UserDto | null>;
  findOneByEmail(email: Email): Promise<UserDto | null>;
}
