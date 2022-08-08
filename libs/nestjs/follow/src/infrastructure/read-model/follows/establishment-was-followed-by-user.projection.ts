import { FollowType } from '@melomaniapp/contracts/follow';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EstablishmentWasFollowedByUser } from '../../../domain';
import { FollowDocument, FOLLOWS_PROJECTION } from './follows.schema';

@EventsHandler(EstablishmentWasFollowedByUser)
export class EstablishmentWasFollowedByUserProjection
  implements IEventHandler<EstablishmentWasFollowedByUser>
{
  constructor(
    @InjectModel(FOLLOWS_PROJECTION)
    private readonly follows: Model<FollowDocument>
  ) {}

  async handle(event: EstablishmentWasFollowedByUser) {
    const follow = new this.follows({
      _id: event.payload._id,
      followedById: event.payload.followedById,
      followedByType: FollowType.User,
      followedToId: event.payload.followedToId,
      followedToType: FollowType.Establishment,
    });

    await follow.save();
  }
}
