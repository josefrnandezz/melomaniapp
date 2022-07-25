import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export interface GenreWasAddedProps {
  genreId: string;
}

export class GenreWasAdded extends Event<GenreWasAddedProps> {
  constructor(public readonly id: string, public readonly genreId: string) {
    super(id, {
      genreId,
    });
  }
}
