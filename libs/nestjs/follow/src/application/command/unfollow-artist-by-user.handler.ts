import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UnfollowArtistByUserCommand } from './unfollow-artist-by-user.command';
import { IUserFinder, UserId, USER_FINDER } from '@melomaniapp/nestjs/user';
import {
  AggregateRepository,
  IdNotFoundError,
  InjectAggregateRepository,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { Follow, FollowedBy, FollowedTo, FollowId } from '../../domain';
import { FollowType } from '@melomaniapp/contracts/follow';
import {
  ARTIST_FINDER,
  IArtistFinder,
  ArtistId,
} from '@melomaniapp/nestjs/artist';

@CommandHandler(UnfollowArtistByUserCommand)
export class UnfollowArtistByUserHandler
  implements ICommandHandler<UnfollowArtistByUserCommand>
{
  constructor(
    @Inject(USER_FINDER)
    private readonly userFinder: IUserFinder,
    @Inject(ARTIST_FINDER)
    private readonly artistFinder: IArtistFinder,
    @InjectAggregateRepository(Follow)
    private readonly repository: AggregateRepository<Follow, FollowId>
  ) {}

  async execute(command: UnfollowArtistByUserCommand): Promise<any> {
    const id = FollowId.fromString(command.id);
    const userId = UserId.fromString(command.userId);
    const artistId = ArtistId.fromString(command.artistId);

    const follow = await this.repository.find(id);

    if (!follow) {
      throw IdNotFoundError.withId(id);
    }

    if (!(await this.userFinder.find(userId))) {
      throw IdNotFoundError.withId(userId);
    }

    if (!(await this.artistFinder.find(artistId))) {
      throw IdNotFoundError.withId(artistId);
    }

    follow.unfollowByUserToArtist({
      id,
      followedBy: FollowedBy.with(userId, FollowType.User),
      followedTo: FollowedTo.with(artistId, FollowType.Artist),
    });

    this.repository.save(follow);
  }
}
