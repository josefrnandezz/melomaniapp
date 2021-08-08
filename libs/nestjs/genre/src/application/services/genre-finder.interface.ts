import { GenreDTO } from '@melomaniapp/contracts/genre';

export const GENRE_FINDER = 'GENRE_FINDER';

export interface IGenreFinder {
  findAll(): Promise<GenreDTO[]>;
}
