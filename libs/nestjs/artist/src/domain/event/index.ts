import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

import { ArtistWasCreated, ArtistWasCreatedProps } from './artist-was-created';
import {
  ArtistGenreWasAdded,
  ArtistGenreWasAddedProps,
} from './artist-genre-was-added';
import {
  ArtistGenreWasRemoved,
  ArtistGenreWasRemovedProps,
} from './artist-genre-was-removed';

export * from './artist-was-created';
export * from './artist-genre-was-added';
export * from './artist-genre-was-removed';

export const eventTransformers = {
  ArtistWasCreated: (event: Event<ArtistWasCreatedProps>) =>
    new ArtistWasCreated(
      event.aggregateId,
      event.payload.userId,
      event.payload.name,
      event.payload.alias,
      event.payload.description,
      event.payload.socialLinks
    ),
  ArtistGenreWasAdded: (event: Event<ArtistGenreWasAddedProps>) =>
    new ArtistGenreWasAdded(event.aggregateId, event.payload.genreId),
  ArtistGenreWasRemoved: (event: Event<ArtistGenreWasRemovedProps>) =>
    new ArtistGenreWasRemoved(event.aggregateId, event.payload.genreId),
};
