import { EstablishmentAddressWasUpdatedProjection } from './establishment-address-was-updated.projection';
import { EstablishmentAliasWasUpdatedProjection } from './establishment-alias-was-updated.projection';
import { EstablishmentEmailWasUpdatedProjection } from './establishment-email-was-updated.projection';
import { EstablishmentGenreWasAddedProjection } from './establishment-genre-was-added.projection';
import { EstablishmentGenreWasRemovedProjection } from './establishment-genre-was-removed.projection';
import { EstablishmentInfoWasUpdatedProjection } from './establishment-info-was-updated.projection';
import { EstablishmentWasCreatedProjection } from './establishment-was-created.projection';
import { EstablishmentWasDeletedProjection } from './establishment-was-deleted.projection';

export * from './establishment.schema';

export const projectionHandlers = [
  EstablishmentWasCreatedProjection,
  EstablishmentGenreWasAddedProjection,
  EstablishmentGenreWasRemovedProjection,
  EstablishmentInfoWasUpdatedProjection,
  EstablishmentEmailWasUpdatedProjection,
  EstablishmentAliasWasUpdatedProjection,
  EstablishmentAddressWasUpdatedProjection,
  EstablishmentWasDeletedProjection,
];
