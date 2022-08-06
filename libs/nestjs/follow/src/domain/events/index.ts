import { GenreWasFollowedByUser } from './genre-was-followed-by-user.event';
import { Event } from '@aulasoftwarelibre/nestjs-eventstore';
import { GenreWasUnfollowedByUser } from './genre-was-unfollowed-by-user.event';
import { CreateFollowDTO, UnfollowDTO } from '@melomaniapp/contracts/follow';

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
};
