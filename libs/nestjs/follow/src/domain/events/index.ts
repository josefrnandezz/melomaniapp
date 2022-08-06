import { GenreWasFollowedByUser } from './genre-was-followed-by-user.event';
import { Event } from '@aulasoftwarelibre/nestjs-eventstore';
import { GenreWasUnfollowedByUser } from './genre-was-unfollowed-by-user.event';
import { CreateFollowDTO } from '@melomaniapp/contracts/follow';

export * from './genre-was-followed-by-user.event';
export * from './genre-was-unfollowed-by-user.event';

export const eventTransformers = {
  GenreWasFollowedByUser: (event: Event<CreateFollowDTO>) =>
    new GenreWasFollowedByUser(
      event.aggregateId,
      event.payload.followedFromId,
      event.payload.followedFromType,
      event.payload.followedToId,
      event.payload.followedToType
    ),
  GenreWasUnfollowedByUser: (event: Event) =>
    new GenreWasUnfollowedByUser(event.aggregateId),
};
