import { FollowArtistArtistDTO } from '@melomaniapp/contracts/follow';
import { ArtistId } from '@melomaniapp/nestjs/artist';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FOLLOW_FINDER, IFollowFinder } from '../services';
import { GetArtistsFollowedByArtistQuery } from './get-artists-followed-by-artist.query';

@QueryHandler(GetArtistsFollowedByArtistQuery)
export class GetArtistsFollowedByArtistHandler
  implements IQueryHandler<GetArtistsFollowedByArtistQuery>
{
  constructor(
    @Inject(FOLLOW_FINDER)
    private readonly followFinder: IFollowFinder
  ) {}

  async execute(
    query: GetArtistsFollowedByArtistQuery
  ): Promise<FollowArtistArtistDTO[]> {
    return await this.followFinder.findArtistArtistFollows(
      ArtistId.fromString(query.artistId)
    );
  }
}
