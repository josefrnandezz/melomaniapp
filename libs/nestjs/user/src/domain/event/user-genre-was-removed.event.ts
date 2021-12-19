import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export type UserGenreWasRemovedProps = { genreId: string };

export class UserGenreWasRemoved extends Event<UserGenreWasRemovedProps> {
  constructor(public readonly id: string, public readonly genreId: string) {
    super(id, { genreId });
  }
}
