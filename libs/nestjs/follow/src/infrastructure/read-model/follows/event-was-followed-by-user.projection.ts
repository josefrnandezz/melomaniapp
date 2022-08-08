import { FollowType } from '@melomaniapp/contracts/follow';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventWasFollowedByUser } from '../../../domain';
import { FollowDocument, FOLLOWS_PROJECTION } from './follows.schema';

@EventsHandler(EventWasFollowedByUser)
export class EventWasFollowedByUserProjection
  implements IEventHandler<EventWasFollowedByUser>
{
  constructor(
    @InjectModel(FOLLOWS_PROJECTION)
    private readonly follows: Model<FollowDocument>
  ) {}

  async handle(event: EventWasFollowedByUser) {
    const follow = new this.follows({
      _id: event.payload._id,
      followedById: event.payload.followedById,
      followedByType: FollowType.User,
      followedToId: event.payload.followedToId,
      followedToType: FollowType.Event,
    });

    await follow.save();
  }
}
