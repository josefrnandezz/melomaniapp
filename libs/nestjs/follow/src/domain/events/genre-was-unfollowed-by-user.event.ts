import { Event } from '@aulasoftwarelibre/nestjs-eventstore';
import { UnfollowDTO } from '@melomaniapp/contracts/follow';

export class GenreWasUnfollowedByUser extends Event<UnfollowDTO> {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly genreId: string
  ) {
    super(id, {
      unfollowedById: userId,
      unfollowedToId: genreId,
    });
  }
}
