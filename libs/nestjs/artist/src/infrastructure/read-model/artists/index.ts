import { ArtistAliasWasUpdatedProjection } from './artist-alias-was-updated.projection';
import { ArtistGenreWasAddedProjection } from './artist-genre-was-added.projection';
import { ArtistGenreWasRemovedProjection } from './artist-genre-was-removed.projection';
import { ArtistPersonalInfoWasUpdatedProjection } from './artist-personal-info-was-updated.projection';
import { ArtistSocialLinkWasAddedProjection } from './artist-social-link-was-added.projection';
import { ArtistSocialLinkWasRemovedProjection } from './artist-social-link-was-removed.projection';
import { ArtistWasCreatedProjection } from './artist-was-created.projection';
import { ArtistWasDeletedProjection } from './artist-was-deleted.projection';

export * from './artist.schema';

export const projectionHandlers = [
  ArtistWasCreatedProjection,
  ArtistGenreWasAddedProjection,
  ArtistGenreWasRemovedProjection,
  ArtistAliasWasUpdatedProjection,
  ArtistSocialLinkWasAddedProjection,
  ArtistSocialLinkWasRemovedProjection,
  ArtistPersonalInfoWasUpdatedProjection,
  ArtistWasDeletedProjection,
];
