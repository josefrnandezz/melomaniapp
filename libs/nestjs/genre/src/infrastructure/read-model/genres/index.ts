import { GenreNameWasUpdatedProjection } from './genre-name-was-updated.projection';
import { GenreWasCreatedProjection } from './genre-was-created.projection';

export * from './genre.schema';

export const genresProjections = [
  GenreWasCreatedProjection,
  GenreNameWasUpdatedProjection,
];
