import { Event } from '@aulasoftwarelibre/nestjs-eventstore';
import { CreateUserDto } from '@melomaniapp/contracts/user';

export class UserWasCreated extends Event<CreateUserDto> {
  constructor(
    public readonly id: string,
    public readonly username: string,
    public readonly email: string
  ) {
    super(id, {
      _id: id,
      username,
      email,
      roles: [],
    });
  }
}
