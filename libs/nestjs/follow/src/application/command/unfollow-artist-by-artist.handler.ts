import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UnfollowArtistByArtistCommand } from './unfollow-artist-by-artist.command';
import {
  IArtistFinder,
  ArtistId,
  ARTIST_FINDER,
} from '@melomaniapp/nestjs/artist';
import {
  AggregateRepository,
  IdNotFoundError,
  InjectAggregateRepository,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { Follow, FollowedBy, FollowedTo, FollowId } from '../../domain';
import { FollowType } from '@melomaniapp/contracts/follow';

@CommandHandler(UnfollowArtistByArtistCommand)
export class UnfollowArtistByArtistHandler
  implements ICommandHandler<UnfollowArtistByArtistCommand>
{
  constructor(
    @Inject(ARTIST_FINDER)
    private readonly artistFinder: IArtistFinder,
    @InjectAggregateRepository(Follow)
    private readonly repository: AggregateRepository<Follow, FollowId>
  ) {}

  async execute(command: UnfollowArtistByArtistCommand): Promise<any> {
    const id = FollowId.fromString(command.id);
    const byArtistId = ArtistId.fromString(command.byArtistId);
    const toArtistId = ArtistId.fromString(command.toArtistId);

    const follow = await this.repository.find(id);

    if (!follow) {
      throw IdNotFoundError.withId(id);
    }

    if (!(await this.artistFinder.find(byArtistId))) {
      throw IdNotFoundError.withId(byArtistId);
    }

    if (!(await this.artistFinder.find(toArtistId))) {
      throw IdNotFoundError.withId(toArtistId);
    }

    follow.unfollowByArtistToArtist({
      id,
      followedBy: FollowedBy.with(byArtistId, FollowType.Artist),
      followedTo: FollowedTo.with(toArtistId, FollowType.Artist),
    });

    this.repository.save(follow);
  }
}
