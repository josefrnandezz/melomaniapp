import { ArtistWasFollowedByUserProjection } from './artist-was-followed-by-user.projection';
import { ArtistWasUnfollowedByUserProjection } from './artist-was-unfollowed-by-user.projection';
import { EstablishmentWasFollowedByUserProjection } from './establishment-was-followed-by-user.projection';
import { EstablishmentWasUnfollowedByUserProjection } from './establishment-was-unfollowed-by-user.projection';
import { GenreWasFollowedByUserProjection } from './genre-was-followed-by-user.projection';
import { GenreWasUnfollowedByUserProjection } from './genre-was-unfollowed-by-user.projection';

export * from './follows.schema';

export const projectionHandlers = [
  ArtistWasFollowedByUserProjection,
  ArtistWasUnfollowedByUserProjection,
  EstablishmentWasFollowedByUserProjection,
  EstablishmentWasUnfollowedByUserProjection,
  GenreWasFollowedByUserProjection,
  GenreWasUnfollowedByUserProjection,
];
