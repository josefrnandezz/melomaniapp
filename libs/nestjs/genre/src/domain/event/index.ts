import { Event } from '@aulasoftwarelibre/nestjs-eventstore';
import { CreateGenreDTO } from '@melomaniapp/contracts/genre';

import {
  GenreNameWasUpdated,
  GenreNameWasUpdatedProps,
} from './genre-name-was-updated.event';
import { GenreWasCreated } from './genre-was-created.event';
import { GenreWasDeleted } from './genre-was-deleted.event';

export * from './genre-name-was-updated.event';
export * from './genre-was-created.event';
export * from './genre-was-deleted.event';

export const eventTransformers = {
  GenreWasCreated: (event: Event<CreateGenreDTO>) =>
    new GenreWasCreated(event.aggregateId, event.payload.name),
  GenreNameWasUpdated: (event: Event<GenreNameWasUpdatedProps>) =>
    new GenreNameWasUpdated(event.aggregateId, event.payload.name),
  GenreWasDeleted: (event: Event) => new GenreWasDeleted(event.aggregateId),
};
