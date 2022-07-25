import {
  EventWasCreated,
  EventWasCreatedProps,
} from './event-was-created.event';
import { Event } from '@aulasoftwarelibre/nestjs-eventstore';
import { ArtistWasAdded, ArtistWasAddedProps } from './artist-was-added.event';
import {
  ArtistWasRemoved,
  ArtistWasRemovedProps,
} from './artist-was-removed.event';
import { GenreWasAdded, GenreWasAddedProps } from './genre-was-added.event';
import {
  GenreWasRemoved,
  GenreWasRemovedProps,
} from './genre-was-removed.event';

export * from './artist-was-added.event';
export * from './artist-was-removed.event';
export * from './event-was-created.event';
export * from './genre-was-added.event';
export * from './genre-was-removed.event';

export const eventTransformers = {
  EventWasCreated: (event: Event<EventWasCreatedProps>) =>
    new EventWasCreated(
      event.aggregateId,
      event.payload.userId,
      event.payload.name,
      event.payload.description,
      event.payload.startsAt,
      event.payload.endsAt,
      event.payload.address,
      event.payload.establishmentId
    ),
  ArtistWasAdded: (event: Event<ArtistWasAddedProps>) =>
    new ArtistWasAdded(event.aggregateId, event.payload.artistId),
  ArtistWasRemoved: (event: Event<ArtistWasRemovedProps>) =>
    new ArtistWasRemoved(event.aggregateId, event.payload.artistId),
  GenreWasAdded: (event: Event<GenreWasAddedProps>) =>
    new GenreWasAdded(event.aggregateId, event.payload.genreId),
  GenreWasRemoved: (event: Event<GenreWasRemovedProps>) =>
    new GenreWasRemoved(event.aggregateId, event.payload.genreId),
};
