import {
  ArtistGenreWasAddedProjection,
  ArtistGenreWasRemovedProjection,
} from './artists';
import { ArtistWasCreatedProjection } from './artists/artist-was-created.projection';

export * from './artists';

export const projectionHandlers = [
  ArtistWasCreatedProjection,
  ArtistGenreWasAddedProjection,
  ArtistGenreWasRemovedProjection,
];
