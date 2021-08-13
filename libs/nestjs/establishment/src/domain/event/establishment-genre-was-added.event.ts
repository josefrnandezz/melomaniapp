import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export type EstablishmentGenreWasAddedProps = { genreId: string };

export class EstablishmentGenreWasAdded extends Event<EstablishmentGenreWasAddedProps> {
  constructor(public readonly id: string, public readonly genreId: string) {
    super(id, { genreId });
  }
}
