import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { FollowGenreByUserCommand } from './follow-genre-by-user.command';
import { GenreId, GENRE_FINDER, IGenreFinder } from '@melomaniapp/nestjs/genre';
import { IUserFinder, UserId, USER_FINDER } from '@melomaniapp/nestjs/user';
import {
  AggregateRepository,
  IdAlreadyRegisteredError,
  IdNotFoundError,
  InjectAggregateRepository,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { Follow, FollowedBy, FollowedTo, FollowId } from '../../domain';

import { FollowDTO, FollowType } from '@melomaniapp/contracts/follow';
import { FOLLOW_FINDER, IFollowFinder } from '../services';

@CommandHandler(FollowGenreByUserCommand)
export class FollowGenreByUserHandler
  implements ICommandHandler<FollowGenreByUserCommand>
{
  constructor(
    @Inject(USER_FINDER)
    private readonly userFinder: IUserFinder,
    @Inject(GENRE_FINDER)
    private readonly genreFinder: IGenreFinder,
    @Inject(FOLLOW_FINDER)
    private readonly followFinder: IFollowFinder,
    @InjectAggregateRepository(Follow)
    private readonly repository: AggregateRepository<Follow, FollowId>
  ) {}

  async execute(command: FollowGenreByUserCommand): Promise<any> {
    const id = FollowId.fromString(command.id);
    const userId = UserId.fromString(command.userId);
    const genreId = GenreId.fromString(command.genreId);

    if ((await this.followFinder.find(id)) instanceof FollowDTO) {
      throw IdAlreadyRegisteredError.withId(id);
    }

    if (!(await this.userFinder.find(userId))) {
      throw IdNotFoundError.withId(userId);
    }

    if (!(await this.genreFinder.find(genreId))) {
      throw IdNotFoundError.withId(genreId);
    }

    const follow = Follow.byUserToGenre({
      id,
      followedBy: FollowedBy.with(userId, FollowType.User),
      followedTo: FollowedTo.with(genreId, FollowType.Genre),
    });

    this.repository.save(follow);
  }
}
