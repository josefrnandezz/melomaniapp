import { FollowType } from '@melomaniapp/contracts/follow';
import { EventDocument, EVENTS_PROJECTION } from '@melomaniapp/nestjs/event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventWasFollowedByUser } from '../../../domain';
import {
  FOLLOWS_USER_EVENT_PROJECTION,
  FollowUserEventDocument,
} from './follow-user-event';

@EventsHandler(EventWasFollowedByUser)
export class EventWasFollowedByUserProjection
  implements IEventHandler<EventWasFollowedByUser>
{
  constructor(
    @InjectModel(FOLLOWS_USER_EVENT_PROJECTION)
    private readonly follows: Model<FollowUserEventDocument>,
    @InjectModel(EVENTS_PROJECTION)
    private readonly events: Model<EventDocument>
  ) {}

  async handle(domainEvent: EventWasFollowedByUser) {
    const event = await this.events
      .findById(domainEvent.payload.followedToId)
      .select({ _id: true, name: true, description: true })
      .lean();

    const follow = new this.follows({
      _id: domainEvent.payload._id,
      followedById: domainEvent.payload.followedById,
      followedToId: domainEvent.payload.followedToId,
      event: {
        name: event.name,
        description: event.description,
      },
    });

    await follow.save();
  }
}
