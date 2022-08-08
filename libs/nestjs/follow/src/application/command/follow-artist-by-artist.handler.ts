import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { FollowArtistByArtistCommand } from './follow-artist-by-artist.command';
import {
  ArtistId,
  IArtistFinder,
  ARTIST_FINDER,
} from '@melomaniapp/nestjs/artist';
import {
  AggregateRepository,
  IdAlreadyRegisteredError,
  IdNotFoundError,
  InjectAggregateRepository,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { Follow, FollowedBy, FollowedTo, FollowId } from '../../domain';

import { FollowDTO, FollowType } from '@melomaniapp/contracts/follow';
import { FOLLOW_FINDER, IFollowFinder } from '../services';

@CommandHandler(FollowArtistByArtistCommand)
export class FollowArtistByArtistHandler
  implements ICommandHandler<FollowArtistByArtistCommand>
{
  constructor(
    @Inject(ARTIST_FINDER)
    private readonly artistFinder: IArtistFinder,
    @Inject(FOLLOW_FINDER)
    private readonly followFinder: IFollowFinder,
    @InjectAggregateRepository(Follow)
    private readonly repository: AggregateRepository<Follow, FollowId>
  ) {}

  async execute(command: FollowArtistByArtistCommand): Promise<any> {
    const id = FollowId.fromString(command.id);
    const byArtistId = ArtistId.fromString(command.byArtistId);
    const toArtistId = ArtistId.fromString(command.toArtistId);

    if ((await this.followFinder.find(id)) instanceof FollowDTO) {
      throw IdAlreadyRegisteredError.withId(id);
    }

    if (!(await this.artistFinder.find(byArtistId))) {
      throw IdNotFoundError.withId(byArtistId);
    }

    if (!(await this.artistFinder.find(toArtistId))) {
      throw IdNotFoundError.withId(toArtistId);
    }

    const follow = Follow.byArtistToArtist({
      id,
      followedBy: FollowedBy.with(byArtistId, FollowType.Artist),
      followedTo: FollowedTo.with(toArtistId, FollowType.Artist),
    });

    this.repository.save(follow);
  }
}
