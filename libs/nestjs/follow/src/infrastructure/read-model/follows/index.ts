import { ArtistWasFollowedByArtistProjection } from './artist-was-followed-by-artist.projection';
import { ArtistWasFollowedByUserProjection } from './artist-was-followed-by-user.projection';
import { ArtistWasUnfollowedByArtistProjection } from './artist-was-unfollowed-by-artist.projection';
import { ArtistWasUnfollowedByUserProjection } from './artist-was-unfollowed-by-user.projection';
import { EstablishmentWasFollowedByUserProjection } from './establishment-was-followed-by-user.projection';
import { EstablishmentWasUnfollowedByUserProjection } from './establishment-was-unfollowed-by-user.projection';
import { EventWasFollowedByUserProjection } from './event-was-followed-by-user.projection';
import { EventWasUnfollowedByUserProjection } from './event-was-unfollowed-by-user.projection';
import { GenreWasFollowedByUserProjection } from './genre-was-followed-by-user.projection';
import { GenreWasUnfollowedByUserProjection } from './genre-was-unfollowed-by-user.projection';

export * from './follows.schema';

export const projectionHandlers = [
  ArtistWasFollowedByArtistProjection,
  ArtistWasUnfollowedByArtistProjection,
  ArtistWasFollowedByUserProjection,
  ArtistWasUnfollowedByUserProjection,
  EstablishmentWasFollowedByUserProjection,
  EstablishmentWasUnfollowedByUserProjection,
  EventWasFollowedByUserProjection,
  EventWasUnfollowedByUserProjection,
  GenreWasFollowedByUserProjection,
  GenreWasUnfollowedByUserProjection,
];
