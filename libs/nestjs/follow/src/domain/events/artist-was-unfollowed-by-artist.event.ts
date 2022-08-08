import { Event } from '@aulasoftwarelibre/nestjs-eventstore';
import { UnfollowDTO } from '@melomaniapp/contracts/follow';

export class ArtistWasUnfollowedByArtist extends Event<UnfollowDTO> {
  constructor(
    public readonly id: string,
    public readonly byArtistId: string,
    public readonly toArtistId: string
  ) {
    super(id, {
      _id: id,
      unfollowedById: byArtistId,
      unfollowedToId: toArtistId,
    });
  }
}
