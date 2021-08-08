import { Event } from '@aulasoftwarelibre/nestjs-eventstore';
import { CreateGenreDTO } from '@melomaniapp/contracts/genre';

import { GenreWasCreated } from './genre-was-created.event';

export * from './genre-was-created.event';

export const eventTransformers = {
  GenreWasCreated: (event: Event<CreateGenreDTO>) =>
    new GenreWasCreated(event.aggregateId, event.payload.name),
};
