import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventWasUnfollowedByUser } from '../../../domain';
import {
  FOLLOWS_USER_EVENT_PROJECTION,
  FollowUserEventDocument,
} from './follow-user-event';
import { FollowDocument, FOLLOWS_PROJECTION } from './follows.schema';

@EventsHandler(EventWasUnfollowedByUser)
export class EventWasUnfollowedByUserProjection
  implements IEventHandler<EventWasUnfollowedByUser>
{
  constructor(
    @InjectModel(FOLLOWS_USER_EVENT_PROJECTION)
    private readonly follows: Model<FollowUserEventDocument>
  ) {}

  async handle(event: EventWasUnfollowedByUser) {
    await this.follows.findByIdAndDelete(event.aggregateId).exec();
  }
}
