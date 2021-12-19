import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export type UserGenreWasAddedProps = { genreId: string };

export class UserGenreWasAdded extends Event<UserGenreWasAddedProps> {
  constructor(public readonly id: string, public readonly genreId: string) {
    super(id, { genreId });
  }
}
