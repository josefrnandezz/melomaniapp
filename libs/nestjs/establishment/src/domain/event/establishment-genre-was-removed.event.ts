import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export type EstablishmentGenreWasRemovedProps = {
  genreId: string;
};

export class EstablishmentGenreWasRemoved extends Event<EstablishmentGenreWasRemovedProps> {
  constructor(public readonly id: string, public readonly genreId: string) {
    super(id, { genreId });
  }
}
