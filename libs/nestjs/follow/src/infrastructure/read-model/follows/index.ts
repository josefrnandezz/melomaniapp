import { GenreWasFollowedByUserProjection } from './genre-was-followed-by-user.projection';
import { GenreWasUnfollowedByUserProjection } from './genre-was-unfollowed-by-user.projection';

export * from './follows.schema';

export const projectionHandlers = [
  GenreWasFollowedByUserProjection,
  GenreWasUnfollowedByUserProjection,
];
