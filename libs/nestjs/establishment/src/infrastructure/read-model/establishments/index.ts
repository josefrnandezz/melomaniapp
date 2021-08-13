import { EstablishmentGenreWasAddedProjection } from './establishment-genre-was-added.projection';
import { EstablishmentWasCreatedProjection } from './establishment-was-created.projection';

export * from './establishment.schema';

export const projectionHandlers = [
  EstablishmentWasCreatedProjection,
  EstablishmentGenreWasAddedProjection,
];
