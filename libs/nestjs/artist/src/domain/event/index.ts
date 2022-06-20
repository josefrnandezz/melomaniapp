import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

import {
  ArtistAliasWasUpdated,
  ArtistAliasWasUpdatedProps,
} from './artist-alias-was-updated';
import {
  ArtistGenreWasAdded,
  ArtistGenreWasAddedProps,
} from './artist-genre-was-added';
import {
  ArtistGenreWasRemoved,
  ArtistGenreWasRemovedProps,
} from './artist-genre-was-removed';
import {
  ArtistSocialLinkWasAdded,
  ArtistSocialLinkWasAddedProps,
} from './artist-social-link-was-added';
import { ArtistWasCreated, ArtistWasCreatedProps } from './artist-was-created';
import { ArtistWasDeleted } from './artist-was-deleted';

export * from './artist-alias-was-updated';
export * from './artist-genre-was-added';
export * from './artist-genre-was-removed';
export * from './artist-social-link-was-added';
export * from './artist-social-link-was-removed';
export * from './artist-was-created';
export * from './artist-was-deleted';

export const eventTransformers = {
  ArtistWasCreated: (event: Event<ArtistWasCreatedProps>) =>
    new ArtistWasCreated(
      event.aggregateId,
      event.payload.userId,
      event.payload.name,
      event.payload.alias,
      event.payload.description,
      event.payload.socialLinks
    ),
  ArtistGenreWasAdded: (event: Event<ArtistGenreWasAddedProps>) =>
    new ArtistGenreWasAdded(event.aggregateId, event.payload.genreId),
  ArtistGenreWasRemoved: (event: Event<ArtistGenreWasRemovedProps>) =>
    new ArtistGenreWasRemoved(event.aggregateId, event.payload.genreId),
  ArtistAliasWasUpdated: (event: Event<ArtistAliasWasUpdatedProps>) =>
    new ArtistAliasWasUpdated(event.aggregateId, event.payload.alias),
  ArtistWasDeleted: (event: ArtistWasDeleted) =>
    new ArtistWasDeleted(event.aggregateId),
  ArtistSocialLinkWasAdded: (event: Event<ArtistSocialLinkWasAddedProps>) =>
    new ArtistSocialLinkWasAdded(event.aggregateId, event.payload.socialLink),
  ArtistSocialLinkWasRemoved: (event: Event<ArtistSocialLinkWasAddedProps>) =>
    new ArtistSocialLinkWasAdded(event.aggregateId, event.payload.socialLink),
};
