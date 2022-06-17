import { ArtistDTO } from '@melomaniapp/contracts/artist';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ARTIST_FINDER, IArtistFinder } from '../services';
import { GetArtistsQuery } from './get-artists-query';

@QueryHandler(GetArtistsQuery)
export class GetArtistsHandler implements IQueryHandler<GetArtistsQuery> {
  constructor(
    @Inject(ARTIST_FINDER)
    private readonly finder: IArtistFinder
  ) {}

  async execute(): Promise<ArtistDTO[]> {
    return await this.finder.findAll();
  }
}
