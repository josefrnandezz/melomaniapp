import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

import {
  EstablishmentAddressWasUpdated,
  EstablishmentAddressWasUpdatedProps,
} from './establishment-address-was-updated.event';
import {
  EstablishmentEmailWasUpdated,
  EstablishmentEmailWasUpdatedProps,
} from './establishment-email-was-updated.event';
import {
  EstablishmentGenreWasAdded,
  EstablishmentGenreWasAddedProps,
} from './establishment-genre-was-added.event';
import {
  EstablishmentGenreWasRemoved,
  EstablishmentGenreWasRemovedProps,
} from './establishment-genre-was-removed.event';
import {
  EstablishmentInfoWasUpdated,
  EstablishmentInfoWasUpdatedProps,
} from './establishment-info-was-updated.event';
import {
  EstablishmentSlugWasUpdated,
  EstablishmentSlugWasUpdatedProps,
} from './establishment-slug-was-updated.event';
import {
  EstablishmentWasCreated,
  EstablishmentWasCreatedProps,
} from './establishment-was-created.event';
import { EstablishmentWasDeleted } from './establishment-was-deleted.event';

export * from './establishment-address-was-updated.event';
export * from './establishment-email-was-updated.event';
export * from './establishment-genre-was-added.event';
export * from './establishment-genre-was-removed.event';
export * from './establishment-info-was-updated.event';
export * from './establishment-slug-was-updated.event';
export * from './establishment-was-created.event';
export * from './establishment-was-deleted.event';

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
  EstablishmentGenreWasRemoved: (
    event: Event<EstablishmentGenreWasRemovedProps>
  ) =>
    new EstablishmentGenreWasRemoved(event.aggregateId, event.payload.genreId),
  EstablishmentInfoWasUpdated: (
    event: Event<EstablishmentInfoWasUpdatedProps>
  ) =>
    new EstablishmentInfoWasUpdated(
      event.aggregateId,
      event.payload.name,
      event.payload.description
    ),
  EstablishmentEmailWasUpdated: (
    event: Event<EstablishmentEmailWasUpdatedProps>
  ) => new EstablishmentEmailWasUpdated(event.aggregateId, event.payload.email),
  EstablishmentSlugWasUpdated: (
    event: Event<EstablishmentSlugWasUpdatedProps>
  ) => new EstablishmentSlugWasUpdated(event.aggregateId, event.payload.slug),
  EstablishmentAddressWasUpdated: (
    event: Event<EstablishmentAddressWasUpdatedProps>
  ) =>
    new EstablishmentAddressWasUpdated(
      event.aggregateId,
      event.payload.city,
      event.payload.full
    ),
  EstablishmentWasDeleted: (event: Event) =>
    new EstablishmentWasDeleted(event.aggregateId),
};
