import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { EventWasCreated } from '../../../domain';
import { EventDocument, EVENTS_PROJECTION } from './events.schema';

@EventsHandler(EventWasCreated)
export class EventWasCreatedProjection
  implements IEventHandler<EventWasCreated>
{
  constructor(
    @InjectModel(EVENTS_PROJECTION)
    private readonly events: Model<EventDocument>
  ) {}

  async handle(event: EventWasCreated) {
    const newEvent = new this.events({ ...event.payload });

    await newEvent.save();
  }
}
