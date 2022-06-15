import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export type ArtistGenreWasAddedProps = { genreId: string };

export class ArtistGenreWasAdded extends Event<ArtistGenreWasAddedProps> {
  constructor(public readonly id: string, public readonly genreId: string) {
    super(id, { genreId });
  }
}
