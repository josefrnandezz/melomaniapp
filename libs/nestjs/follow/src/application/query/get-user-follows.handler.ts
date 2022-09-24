import {
  FollowArtistArtistDTO,
  FollowDTO,
  FollowType,
  FollowUserArtistDTO,
  FollowUserEstablishmentDTO,
  FollowUserEventDTO,
  FollowUserGenreDTO,
} from '@melomaniapp/contracts/follow';
import { UserId } from '@melomaniapp/nestjs/user';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FOLLOW_FINDER, IFollowFinder } from '../services';
import { GetUserFollowsQuery } from './get-user-follows.query';

type Follow =
  | FollowUserArtistDTO
  | FollowUserEstablishmentDTO
  | FollowUserGenreDTO
  | FollowUserEventDTO
  | FollowArtistArtistDTO;

@QueryHandler(GetUserFollowsQuery)
export class GetUserFollowsHandler
  implements IQueryHandler<GetUserFollowsQuery>
{
  constructor(
    @Inject(FOLLOW_FINDER)
    private readonly followFinder: IFollowFinder
  ) {}

  async execute({ type, userId }: GetUserFollowsQuery): Promise<Follow[]> {
    const id = UserId.fromString(userId);

    const follows = await this.findFollows(id, type);

    return follows;
  }

  private findFollows(id: UserId, type: FollowType): Promise<Follow[]> {
    if (Number(type) === FollowType.Artist) {
      return this.followFinder.findUserArtistFollows(id);
    }

    if (Number(type) === FollowType.Genre) {
      return this.followFinder.findUserGenreFollows(id);
    }

    if (Number(type) === FollowType.Event) {
      return this.followFinder.findUserEventFollows(id);
    }

    if (Number(type) === FollowType.Establishment) {
      return this.followFinder.findUserEstablishmentFollows(id);
    }
  }
}
