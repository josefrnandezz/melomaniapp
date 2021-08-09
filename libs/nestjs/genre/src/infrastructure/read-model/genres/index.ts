import { GenreNameWasUpdatedProjection } from './genre-name-was-updated.projection';
import { GenreWasCreatedProjection } from './genre-was-created.projection';
import { GenreWasDeletedProjection } from './genre-was-deleted.projection';

export * from './genre.schema';

export const genresProjections = [
  GenreWasCreatedProjection,
  GenreNameWasUpdatedProjection,
  GenreWasDeletedProjection,
];
