import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { FollowGenreFromUserCommand } from './follow-genre-from-user.command';
import { GenreId, GENRE_FINDER, IGenreFinder } from '@melomaniapp/nestjs/genre';
import { IUserFinder, UserId, USER_FINDER } from '@melomaniapp/nestjs/user';
import {
  AggregateRepository,
  IdAlreadyRegisteredError,
  IdNotFoundError,
  InjectAggregateRepository,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { Follow, FollowedFrom, FollowedTo, FollowId } from '../../domain';
import {
  FOLLOW_FINDER,
  IFollowFinder,
} from '../services/follow-finder.interface';
import { FollowDTO, FollowType } from '@melomaniapp/contracts/follow';

@CommandHandler(FollowGenreFromUserCommand)
export class FollowGenreFromUserHandler
  implements ICommandHandler<FollowGenreFromUserCommand>
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

  async execute(command: FollowGenreFromUserCommand): Promise<any> {
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

    const from = FollowedFrom.with(userId, FollowType.User);
    const to = FollowedTo.with(genreId, FollowType.Genre);

    const follow = Follow.createFromUserToGenre({ id, from, to });

    this.repository.save(follow);
  }
}
