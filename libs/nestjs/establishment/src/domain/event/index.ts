import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

import {
  EstablishmentAddressWasUpdated,
  EstablishmentAddressWasUpdatedProps,
} from './establishment-address-was-updated.event';
import {
  EstablishmentAliasWasUpdated,
  EstablishmentAliasWasUpdatedProps,
} from './establishment-alias-was-updated.event';
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
  EstablishmentWasCreated,
  EstablishmentWasCreatedProps,
} from './establishment-was-created.event';
import { EstablishmentWasDeleted } from './establishment-was-deleted.event';

export * from './establishment-address-was-updated.event';
export * from './establishment-alias-was-updated.event';
export * from './establishment-email-was-updated.event';
export * from './establishment-genre-was-added.event';
export * from './establishment-genre-was-removed.event';
export * from './establishment-info-was-updated.event';
export * from './establishment-was-created.event';
export * from './establishment-was-deleted.event';

export const eventTransformers = {
  EstablishmentWasCreated: (event: Event<EstablishmentWasCreatedProps>) =>
    new EstablishmentWasCreated(
      event.aggregateId,
      event.payload.ownerId,
      event.payload.name,
      event.payload.alias,
      event.payload.description,
      event.payload.email,
      event.payload.address,
      event.payload.imageUrl
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
  EstablishmentAliasWasUpdated: (
    event: Event<EstablishmentAliasWasUpdatedProps>
  ) => new EstablishmentAliasWasUpdated(event.aggregateId, event.payload.alias),
  EstablishmentAddressWasUpdated: (
    event: Event<EstablishmentAddressWasUpdatedProps>
  ) =>
    new EstablishmentAddressWasUpdated(
      event.aggregateId,
      event.payload.full,
      event.payload.city
    ),
  EstablishmentWasDeleted: (event: Event) =>
    new EstablishmentWasDeleted(event.aggregateId),
};
