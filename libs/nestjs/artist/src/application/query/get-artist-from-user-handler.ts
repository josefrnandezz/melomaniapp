import { IdNotFoundError } from '@aulasoftwarelibre/nestjs-eventstore';
import { ArtistDTO } from '@melomaniapp/contracts/artist';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { UserId } from '../../domain';
import { ARTIST_FINDER, IArtistFinder } from '../services';
import { GetArtistFromUserQuery } from './get-artist-from-user-query';

@QueryHandler(GetArtistFromUserQuery)
export class GetArtistFromUserHandler
  implements IQueryHandler<GetArtistFromUserQuery>
{
  constructor(
    @Inject(ARTIST_FINDER)
    private readonly finder: IArtistFinder
  ) {}

  async execute(query: GetArtistFromUserQuery): Promise<ArtistDTO> {
    const id = UserId.fromString(query.userId);

    const artist = await this.finder.findOneByUser(id);

    if (!artist) {
      throw IdNotFoundError.withId(id);
    }

    return artist;
  }
}
