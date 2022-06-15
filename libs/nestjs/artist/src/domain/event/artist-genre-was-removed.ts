import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export type ArtistGenreWasRemovedProps = { genreId: string };

export class ArtistGenreWasRemoved extends Event<ArtistGenreWasRemovedProps> {
  constructor(public readonly id: string, public readonly genreId: string) {
    super(id, { genreId });
  }
}
