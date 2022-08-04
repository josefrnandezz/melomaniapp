import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { FollowGenreFromUserCommand } from './follow-genre-from-user.command';
import { GenreId, IGenreFinder } from '@melomaniapp/nestjs/genre';
import { IUserFinder, UserId } from '@melomaniapp/nestjs/user';
import {
  AggregateRepository,
  IdNotFoundError,
  InjectAggregateRepository,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { Follow, FollowId } from '../../domain';

@CommandHandler(FollowGenreFromUserCommand)
export class FollowGenreFromUserHandler
  implements ICommandHandler<FollowGenreFromUserCommand>
{
  constructor(
    @Inject()
    private readonly userFinder: IUserFinder,
    @Inject()
    private readonly genreFinder: IGenreFinder,
    @InjectAggregateRepository(Follow)
    private readonly repository: AggregateRepository<Follow, FollowId>
  ) {}

  async execute(command: FollowGenreFromUserCommand): Promise<any> {
    const id = FollowId.fromString(command.id);
    const userId = UserId.fromString(command.userId);
    const genreId = GenreId.fromString(command.genreId);

    if (!(await this.userFinder.find(UserId.fromString(command.userId)))) {
      throw IdNotFoundError.withId(userId);
    }

    if (!(await this.genreFinder.find(GenreId.fromString(command.genreId)))) {
      throw IdNotFoundError.withId(genreId);
    }

    const follow = Follow.createFromUserToGenre({ id, userId, genreId });

    this.repository.save(follow);
  }
}
