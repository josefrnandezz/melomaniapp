import {
  GenreWasFollowedByUser,
  GenreWasFollowedByUserProps,
} from './genre-was-followed-by-user.event';
import { Event } from '@aulasoftwarelibre/nestjs-eventstore';
import { GenreWasUnfollowedByUser } from './genre-was-unfollowed-by-user.event';

export * from './genre-was-followed-by-user.event';
export * from './genre-was-unfollowed-by-user.event';

export const eventTransformers = {
  GenreWasFollowedByUser: (event: Event<GenreWasFollowedByUserProps>) =>
    new GenreWasFollowedByUser(
      event.aggregateId,
      event.payload.userId,
      event.payload.userId
    ),
  GenreWasUnfollowedByUser: (event: Event) =>
    new GenreWasUnfollowedByUser(event.aggregateId),
};
