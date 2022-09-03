import { FollowDTO } from '@melomaniapp/contracts/follow';
import { ArtistId } from '@melomaniapp/nestjs/artist';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FOLLOW_FINDER, IFollowFinder } from '../services';
import { GetArtistFollowersQuery } from './get-artist-followers.query';

@QueryHandler(GetArtistFollowersQuery)
export class GetArtistFollowersHandler
  implements IQueryHandler<GetArtistFollowersQuery>
{
  constructor(
    @Inject(FOLLOW_FINDER)
    private readonly followFinder: IFollowFinder
  ) {}
  async execute(query: GetArtistFollowersQuery): Promise<FollowDTO[]> {
    return await this.followFinder.findFollowersByArtist(
      ArtistId.fromString(query.artistId)
    );
  }
}
