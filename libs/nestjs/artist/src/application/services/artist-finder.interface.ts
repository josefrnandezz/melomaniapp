import { ArtistDTO } from '@melomaniapp/contracts/artist';
import { Alias } from '@melomaniapp/nestjs/common';
import { ArtistId } from '../../domain';

export const ARTIST_FINDER = 'ARTIST_FINDER';

export interface IArtistFinder {
  find(id: ArtistId): Promise<ArtistDTO>;
  findAll(): Promise<ArtistDTO[]>;
  findByAlias(alias: Alias): Promise<ArtistDTO>;
}
