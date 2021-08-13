import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

import {
  EstablishmentGenreWasAdded,
  EstablishmentGenreWasAddedProps,
} from './establishment-genre-was-added.event';
import {
  EstablishmentWasCreated,
  EstablishmentWasCreatedProps,
} from './establishment-was-created.event';

export * from './establishment-genre-was-added.event';
export * from './establishment-was-created.event';

export const eventTransformers = {
  EstablishmentWasCreated: (event: Event<EstablishmentWasCreatedProps>) =>
    new EstablishmentWasCreated(
      event.aggregateId,
      event.payload.ownerId,
      event.payload.name,
      event.payload.slug,
      event.payload.description,
      event.payload.email,
      event.payload.address
    ),
  EstablishmentGenreWasAdded: (event: Event<EstablishmentGenreWasAddedProps>) =>
    new EstablishmentGenreWasAdded(event.aggregateId, event.payload.genreId),
};
