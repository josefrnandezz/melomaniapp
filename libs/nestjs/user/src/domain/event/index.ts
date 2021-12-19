import { Event } from '@aulasoftwarelibre/nestjs-eventstore';
import { CreateUserDto } from '@melomaniapp/contracts/user';

import { UserCityWasUpdated } from './user-city-was-updated.event';
import {
  UserGenreWasAdded,
  UserGenreWasAddedProps,
} from './user-genre-was-added.event';
import {
  UserGenreWasRemoved,
  UserGenreWasRemovedProps,
} from './user-genre-was-removed.event';
import {
  UserPasswordWasUpdated,
  UserPasswordWasUpdatedProps,
} from './user-password-was-updated.event';
import {
  UserRoleWasAdded,
  UserRoleWasAddedProps,
} from './user-role-was-added.event';
import {
  UserRoleWasRemoved,
  UserRoleWasRemovedProps,
} from './user-role-was-removed.event';
import { UserWasCreated } from './user-was-created.event';
import { UserWasDeleted } from './user-was-deleted.event';

export * from './user-city-was-updated.event';
export * from './user-genre-was-added.event';
export * from './user-genre-was-removed.event';
export * from './user-password-was-updated.event';
export * from './user-role-was-added.event';
export * from './user-role-was-removed.event';
export * from './user-was-created.event';
export * from './user-was-deleted.event';

export const eventTransformers = {
  UserPasswordWasUpdated: (event: Event<UserPasswordWasUpdatedProps>) =>
    new UserPasswordWasUpdated(event.aggregateId, event.payload.password),
  UserGenreWasAdded: (event: Event<UserGenreWasAddedProps>) =>
    new UserGenreWasAdded(event.aggregateId, event.payload.genreId),
  UserGenreWasRemoved: (event: Event<UserGenreWasRemovedProps>) =>
    new UserGenreWasRemoved(event.aggregateId, event.payload.genreId),
  UserCityWasUpdated: (event: Event<UserCityWasUpdated>) =>
    new UserCityWasUpdated(event.aggregateId, event.payload.city),
  UserRoleWasAdded: (event: Event<UserRoleWasAddedProps>) =>
    new UserRoleWasAdded(event.aggregateId, event.payload.role),
  UserRoleWasRemoved: (event: Event<UserRoleWasRemovedProps>) =>
    new UserRoleWasRemoved(event.aggregateId, event.payload.role),
  UserWasCreated: (event: Event<CreateUserDto>) =>
    new UserWasCreated(
      event.aggregateId,
      event.payload.username,
      event.payload.password,
      event.payload.email
    ),
  UserWasDeleted: (event: Event) => new UserWasDeleted(event.aggregateId),
};
