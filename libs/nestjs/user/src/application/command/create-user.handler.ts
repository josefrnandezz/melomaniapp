import {
  AggregateRepository,
  IdAlreadyRegisteredError,
  InjectAggregateRepository,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  EmailAlreadyTakenError,
  Role,
  User,
  UserId,
  Username,
  UsernameAlreadyTakenError,
} from '../../domain';
import { Email } from '../../domain/model/email';
import { IUserFinder, USER_FINDER } from '../services';
import { CreateUserCommand } from './create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @InjectAggregateRepository(User)
    private readonly users: AggregateRepository<User, UserId>,
    @Inject(USER_FINDER)
    private readonly finder: IUserFinder
  ) {}

  async execute(command: CreateUserCommand) {
    const userId = UserId.fromString(command.userId);
    const username = Username.fromString(command.username);
    const email = Email.fromString(command.email);

    if ((await this.users.find(userId)) instanceof User) {
      throw IdAlreadyRegisteredError.withId(userId);
    }

    if (await this.finder.findOneByUsername(username)) {
      throw UsernameAlreadyTakenError.with(username);
    }

    if (await this.finder.findOneByEmail(email)) {
      throw EmailAlreadyTakenError.with(email);
    }

    const user = User.add(userId, username, email);
    command.roles.map((role: string) => user.addRole(Role.fromString(role)));

    this.users.save(user);
  }
}
