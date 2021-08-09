import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export class GenreWasDeleted extends Event {
  constructor(public readonly id: string) {
    super(id);
  }
}
