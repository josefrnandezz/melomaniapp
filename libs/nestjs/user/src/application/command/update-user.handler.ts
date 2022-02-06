import {
  AggregateRepository,
  IdNotFoundError,
  InjectAggregateRepository,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { City, GenreId, Role, User, UserId } from '../../domain';
import { IUserFinder, USER_FINDER } from '../services';
import { UpdateUserCommand } from './update-user.command';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @InjectAggregateRepository(User)
    private readonly users: AggregateRepository<User, UserId>,
    @Inject(USER_FINDER)
    private readonly finder: IUserFinder
  ) {}

  async execute(command: UpdateUserCommand) {
    const city = City.fromString(command.city);
    const userId = UserId.fromString(command.userId);

    const user = await this.users.find(userId);

    if (!user || user.deleted) {
      throw IdNotFoundError.withId(userId);
    }

    user.updateCity(city);
    this.updateGenres(user, command);
    this.updateRoles(user, command);

    this.users.save(user);
  }

  private updateRoles(user: User, command: UpdateUserCommand) {
    if (command.roles === undefined) {
      return;
    }

    user.roles.map(
      (role) => !command.roles.includes(role.value) && user.removeRole(role)
    );

    command.roles.map((role) => user.addRole(Role.fromString(role)));
  }

  private updateGenres(user: User, command: UpdateUserCommand) {
    if (command.genres === undefined) {
      return;
    }

    user.genres.map(
      (genre) =>
        !command.genres.includes(genre.value) && user.removeGenre(genre)
    );

    command.genres.map((genre) => user.addGenre(GenreId.fromString(genre)));
  }
}
