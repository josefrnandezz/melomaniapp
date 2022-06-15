import { ArtistGenreWasAddedProjection } from './artist-genre-was-added.projection';
import { ArtistGenreWasRemovedProjection } from './artist-genre-was-removed.projection';
import { ArtistWasCreatedProjection } from './artist-was-created.projection';

export * from './artist.schema';

export const projectionHandlers = [
  ArtistWasCreatedProjection,
  ArtistGenreWasAddedProjection,
  ArtistGenreWasRemovedProjection,
];
