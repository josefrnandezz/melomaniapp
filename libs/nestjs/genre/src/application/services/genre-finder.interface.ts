import { GenreDTO } from '@melomaniapp/contracts/genre';

import { GenreId, GenreName } from '../../domain';

export const GENRE_FINDER = 'GENRE_FINDER';

export interface IGenreFinder {
  findAll(): Promise<GenreDTO[]>;
  find(id: GenreId): Promise<GenreDTO>;
  findOneByName(name: GenreName): Promise<GenreDTO>;
}
