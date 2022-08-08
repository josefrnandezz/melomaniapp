import { Event } from '@aulasoftwarelibre/nestjs-eventstore';
import { CreateFollowDTO } from '@melomaniapp/contracts/follow';

export class EstablishmentWasFollowedByUser extends Event<CreateFollowDTO> {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly establishmentId: string
  ) {
    super(id, {
      _id: id,
      followedById: userId,
      followedToId: establishmentId,
    });
  }
}
