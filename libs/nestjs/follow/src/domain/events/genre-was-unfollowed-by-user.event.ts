import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export class GenreWasUnfollowedByUser extends Event {
  constructor(public readonly id: string) {
    super(id);
  }
}
