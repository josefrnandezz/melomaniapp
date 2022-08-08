import { GenreWasFollowedByUser } from './genre-was-followed-by-user.event';
import { Event } from '@aulasoftwarelibre/nestjs-eventstore';
import { GenreWasUnfollowedByUser } from './genre-was-unfollowed-by-user.event';
import { CreateFollowDTO, UnfollowDTO } from '@melomaniapp/contracts/follow';
import { ArtistWasFollowedByUser } from './artist-was-followed-by-user.event';
import { ArtistWasUnfollowedByUser } from './artist-was-unfollowed-by-user.event';
import { EstablishmentWasFollowedByUser } from './establishment-was-followed-by-user.event';
import { EstablishmentWasUnfollowedByUser } from './establishment-was-unfollowed-by-user.event';
import { EventWasFollowedByUser } from './event-was-followed-by-user.event';
import { EventWasUnfollowedByUser } from './event-was-unfollowed-by-user.event';

export * from './artist-was-followed-by-user.event';
export * from './artist-was-unfollowed-by-user.event';
export * from './establishment-was-followed-by-user.event';
export * from './establishment-was-unfollowed-by-user.event';
export * from './event-was-followed-by-user.event';
export * from './event-was-unfollowed-by-user.event';
export * from './genre-was-followed-by-user.event';
export * from './genre-was-unfollowed-by-user.event';

export const eventTransformers = {
  GenreWasFollowedByUser: (event: Event<CreateFollowDTO>) =>
    new GenreWasFollowedByUser(
      event.aggregateId,
      event.payload.followedById,
      event.payload.followedToId
    ),
  GenreWasUnfollowedByUser: (event: Event<UnfollowDTO>) =>
    new GenreWasUnfollowedByUser(
      event.aggregateId,
      event.payload.unfollowedById,
      event.payload.unfollowedToId
    ),
  ArtistWasFollowedByUser: (event: Event<CreateFollowDTO>) =>
    new ArtistWasFollowedByUser(
      event.aggregateId,
      event.payload.followedById,
      event.payload.followedToId
    ),
  ArtistWasUnfollowedByUser: (event: Event<UnfollowDTO>) =>
    new ArtistWasUnfollowedByUser(
      event.aggregateId,
      event.payload.unfollowedById,
      event.payload.unfollowedToId
    ),
  EstablishmentWasFollowedByUser: (event: Event<CreateFollowDTO>) =>
    new EstablishmentWasFollowedByUser(
      event.aggregateId,
      event.payload.followedById,
      event.payload.followedToId
    ),
  EstablishmentWasUnfollowedByUser: (event: Event<UnfollowDTO>) =>
    new EstablishmentWasUnfollowedByUser(
      event.aggregateId,
      event.payload.unfollowedById,
      event.payload.unfollowedToId
    ),
  EventWasFollowedByUser: (event: Event<CreateFollowDTO>) =>
    new EventWasFollowedByUser(
      event.aggregateId,
      event.payload.followedById,
      event.payload.followedToId
    ),
  EventWasUnfollowedByUser: (event: Event<UnfollowDTO>) =>
    new EventWasUnfollowedByUser(
      event.aggregateId,
      event.payload.unfollowedById,
      event.payload.unfollowedToId
    ),
};
