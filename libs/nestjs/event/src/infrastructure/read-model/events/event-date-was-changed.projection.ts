import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { EventDateWasChanged } from '../../../domain';
import { EventDocument, EVENTS_PROJECTION } from './events.schema';

@EventsHandler(EventDateWasChanged)
export class EventDateWasChangedProjection
  implements IEventHandler<EventDateWasChanged>
{
  constructor(
    @InjectModel(EVENTS_PROJECTION)
    private readonly events: Model<EventDocument>
  ) {}

  async handle(event: EventDateWasChanged) {
    await this.events
      .findByIdAndUpdate(event.aggregateId, {
        starsAt: event.startsAt,
        endsAt: event.endsAt,
      })
      .exec();
  }
}
