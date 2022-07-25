import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export interface GenreWasRemovedProps {
  genreId: string;
}

export class GenreWasRemoved extends Event<GenreWasRemovedProps> {
  constructor(public readonly id: string, public readonly genreId: string) {
    super(id, {
      genreId,
    });
  }
}
