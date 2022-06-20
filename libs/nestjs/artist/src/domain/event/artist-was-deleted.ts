import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export class ArtistWasDeleted extends Event {
  constructor(public readonly id: string) {
    super(id);
  }
}
