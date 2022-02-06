import { UserCityWasUpdatedProjection } from './user-city-was-updated.projection';
import { UserGenreWasAddedProjection } from './user-genre-was-added.projection';
import { UserGenreWasRemovedProjection } from './user-genre-was-removed.projection';
import { UserRoleWasAddedProjection } from './user-role-was-added.projection';
import { UserRoleWasRemovedProjection } from './user-role-was-removed.projection';
import { UserWasCreatedProjection } from './user-was-created.projection';
import { UserWasDeletedProjection } from './user-was-deleted.projection';

export * from './user.schema';

export const projectionHandlers = [
  UserCityWasUpdatedProjection,
  UserGenreWasAddedProjection,
  UserGenreWasRemovedProjection,
  UserRoleWasAddedProjection,
  UserRoleWasRemovedProjection,
  UserWasCreatedProjection,
  UserWasDeletedProjection,
];
