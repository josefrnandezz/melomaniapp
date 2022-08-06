import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UnfollowGenreByUserCommand } from './unfollow-genre-by-user.command';
import { GenreId, GENRE_FINDER, IGenreFinder } from '@melomaniapp/nestjs/genre';
import { IUserFinder, UserId, USER_FINDER } from '@melomaniapp/nestjs/user';
import {
  AggregateRepository,
  IdNotFoundError,
  InjectAggregateRepository,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { Follow, FollowedBy, FollowedTo, FollowId } from '../../domain';
import { FollowType } from '@melomaniapp/contracts/follow';

@CommandHandler(UnfollowGenreByUserCommand)
export class UnfollowGenreByUserHandler
  implements ICommandHandler<UnfollowGenreByUserCommand>
{
  constructor(
    @Inject(USER_FINDER)
    private readonly userFinder: IUserFinder,
    @Inject(GENRE_FINDER)
    private readonly genreFinder: IGenreFinder,
    @InjectAggregateRepository(Follow)
    private readonly repository: AggregateRepository<Follow, FollowId>
  ) {}

  async execute(command: UnfollowGenreByUserCommand): Promise<any> {
    const id = FollowId.fromString(command.id);
    const userId = UserId.fromString(command.userId);
    const genreId = GenreId.fromString(command.genreId);

    const follow = await this.repository.find(id);

    if (!follow) {
      throw IdNotFoundError.withId(id);
    }

    if (!(await this.userFinder.find(userId))) {
      throw IdNotFoundError.withId(userId);
    }

    if (!(await this.genreFinder.find(genreId))) {
      throw IdNotFoundError.withId(genreId);
    }

    follow.unfollowByUserToGenre({
      id,
      followedBy: FollowedBy.with(userId, FollowType.User),
      followedTo: FollowedTo.with(genreId, FollowType.Genre),
    });

    this.repository.save(follow);
  }
}
