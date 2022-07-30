import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { EventInfoWasUpdated } from '../../../domain';
import { EventDocument, EVENTS_PROJECTION } from './events.schema';

@EventsHandler(EventInfoWasUpdated)
export class EventInfoWasUpdatedProjection
  implements IEventHandler<EventInfoWasUpdated>
{
  constructor(
    @InjectModel(EVENTS_PROJECTION)
    private readonly events: Model<EventDocument>
  ) {}

  async handle(event: EventInfoWasUpdated) {
    await this.events
      .findByIdAndUpdate(event.aggregateId, {
        name: event.name,
        description: event.description,
      })
      .exec();
  }
}
