import { Event } from '@aulasoftwarelibre/nestjs-eventstore';
import { UnfollowDTO } from '@melomaniapp/contracts/follow';

export class EventWasUnfollowedByUser extends Event<UnfollowDTO> {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly eventId: string
  ) {
    super(id, {
      _id: id,
      unfollowedById: userId,
      unfollowedToId: eventId,
    });
  }
}
