import { Event } from '@aulasoftwarelibre/nestjs-eventstore';
import { CreateFollowDTO } from '@melomaniapp/contracts/follow';

export class EventWasFollowedByUser extends Event<CreateFollowDTO> {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly eventId: string
  ) {
    super(id, {
      _id: id,
      followedById: userId,
      followedToId: eventId,
    });
  }
}
