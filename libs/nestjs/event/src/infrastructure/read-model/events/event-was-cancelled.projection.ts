import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { EventWasCancelled } from '../../../domain';
import { EventDocument, EVENTS_PROJECTION } from './events.schema';

@EventsHandler(EventWasCancelled)
export class EventWasCancelledProjection
  implements IEventHandler<EventWasCancelled>
{
  constructor(
    @InjectModel(EVENTS_PROJECTION)
    private readonly events: Model<EventDocument>
  ) {}

  async handle(event: EventWasCancelled) {
    await this.events
      .findByIdAndUpdate(event.aggregateId, {
        isCancelled: true,
      })
      .exec();
  }
}
