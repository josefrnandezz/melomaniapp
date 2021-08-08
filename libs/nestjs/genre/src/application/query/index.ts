import { GetGenreHandler } from './get-genre.handler';
import { GetGenresHandler } from './get-genres.handler';

export * from './get-genre.query';
export * from './get-genres.query';

export const queryHandlers = [GetGenresHandler, GetGenreHandler];
