import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export interface ArtistWasAddedProps {
  artistId: string;
}

export class ArtistWasAdded extends Event<ArtistWasAddedProps> {
  constructor(public readonly id: string, public readonly artistId: string) {
    super(id, {
      artistId,
    });
  }
}
