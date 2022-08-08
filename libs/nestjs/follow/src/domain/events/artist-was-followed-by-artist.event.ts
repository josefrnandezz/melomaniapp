import { Event } from '@aulasoftwarelibre/nestjs-eventstore';
import { CreateFollowDTO } from '@melomaniapp/contracts/follow';

export class ArtistWasFollowedByArtist extends Event<CreateFollowDTO> {
  constructor(
    public readonly id: string,
    public readonly byArtistId: string,
    public readonly toArtistId: string
  ) {
    super(id, {
      _id: id,
      followedById: byArtistId,
      followedToId: toArtistId,
    });
  }
}
