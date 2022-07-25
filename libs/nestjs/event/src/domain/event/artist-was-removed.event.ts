import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export interface ArtistWasRemovedProps {
  artistId: string;
}

export class ArtistWasRemoved extends Event<ArtistWasRemovedProps> {
  constructor(public readonly id: string, public readonly artistId: string) {
    super(id, {
      artistId,
    });
  }
}
