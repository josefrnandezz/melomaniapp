import { ArtistWasAddedProjection } from './artist-was-added.projection';
import { ArtistWasRemovedProjection } from './artist-was-removed.projection';
import { EventDateWasChangedProjection } from './event-date-was-changed.projection';
import { EventInfoWasUpdatedProjection } from './event-info-was-updated.projection';
import { EventWasCancelledProjection } from './event-was-cancelled.projection';
import { EventWasCreatedProjection } from './event-was-created.projection';
import { GenreWasAddedProjection } from './genre-was-added.projection';
import { GenreWasRemovedProjection } from './genre-was-removed.event';

export * from './events.schema';

export const projectionHandlers = [
  ArtistWasAddedProjection,
  ArtistWasRemovedProjection,
  GenreWasAddedProjection,
  GenreWasRemovedProjection,
  EventWasCreatedProjection,
  EventDateWasChangedProjection,
  EventInfoWasUpdatedProjection,
  EventWasCancelledProjection,
];
