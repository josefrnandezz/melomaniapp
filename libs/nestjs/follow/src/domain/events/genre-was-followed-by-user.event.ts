import { Event } from '@aulasoftwarelibre/nestjs-eventstore';
import { CreateFollowDTO, FollowType } from '@melomaniapp/contracts/follow';

export class GenreWasFollowedByUser extends Event<CreateFollowDTO> {
  constructor(
    public readonly id: string,
    public readonly followedFromId: string,
    public readonly followedFromType: FollowType,
    public readonly followedToId: string,
    public readonly followedToType: FollowType
  ) {
    super(id, {
      _id: id,
      followedFromId,
      followedFromType,
      followedToId,
      followedToType,
    });
  }
}
