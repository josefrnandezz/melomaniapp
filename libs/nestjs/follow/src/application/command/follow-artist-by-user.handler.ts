import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { FollowArtistByUserCommand } from './follow-artist-by-user.command';
import {
  ArtistId,
  IArtistFinder,
  ARTIST_FINDER,
} from '@melomaniapp/nestjs/artist';
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

@CommandHandler(FollowArtistByUserCommand)
export class FollowArtistByUserHandler
  implements ICommandHandler<FollowArtistByUserCommand>
{
  constructor(
    @Inject(USER_FINDER)
    private readonly userFinder: IUserFinder,
    @Inject(ARTIST_FINDER)
    private readonly artistFinder: IArtistFinder,
    @Inject(FOLLOW_FINDER)
    private readonly followFinder: IFollowFinder,
    @InjectAggregateRepository(Follow)
    private readonly repository: AggregateRepository<Follow, FollowId>
  ) {}

  async execute(command: FollowArtistByUserCommand): Promise<any> {
    const id = FollowId.fromString(command.id);
    const userId = UserId.fromString(command.userId);
    const artistId = ArtistId.fromString(command.artistId);

    if ((await this.followFinder.find(id)) instanceof FollowDTO) {
      throw IdAlreadyRegisteredError.withId(id);
    }

    if (!(await this.userFinder.find(userId))) {
      throw IdNotFoundError.withId(userId);
    }

    if (!(await this.artistFinder.find(artistId))) {
      throw IdNotFoundError.withId(artistId);
    }

    const follow = Follow.byUserToArtist({
      id,
      followedBy: FollowedBy.with(userId, FollowType.User),
      followedTo: FollowedTo.with(artistId, FollowType.Artist),
    });

    this.repository.save(follow);
  }
}
