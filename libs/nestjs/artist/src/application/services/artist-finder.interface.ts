import { ArtistDTO } from '@melomaniapp/contracts/artist';
import { Alias } from '@melomaniapp/nestjs/common';

export const ARTIST_FINDER = 'ARTIST_FINDER';

export interface IArtistFinder {
  findByAlias(alias: Alias): Promise<ArtistDTO>;
}
