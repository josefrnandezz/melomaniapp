import { IdNotFoundError } from '@aulasoftwarelibre/nestjs-eventstore';
import { ArtistDTO } from '@melomaniapp/contracts/artist';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ArtistId } from '../../domain';
import { ARTIST_FINDER, IArtistFinder } from '../services';
import { GetArtistQuery } from './get-artist-query';

@QueryHandler(GetArtistQuery)
export class GetArtistHandler implements IQueryHandler<GetArtistQuery> {
  constructor(
    @Inject(ARTIST_FINDER)
    private readonly finder: IArtistFinder
  ) {}

  async execute(query: GetArtistQuery): Promise<ArtistDTO> {
    const id = ArtistId.fromString(query.id);

    const artist = await this.finder.find(id);

    if (!artist) {
      throw IdNotFoundError.withId(id);
    }

    return artist;
  }
}
