import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { GenreWasRemoved } from '../../../domain';
import { EventDocument, EVENTS_PROJECTION } from './events.schema';

@EventsHandler(GenreWasRemoved)
export class GenreWasRemovedProjection
  implements IEventHandler<GenreWasRemoved>
{
  constructor(
    @InjectModel(EVENTS_PROJECTION)
    private readonly events: Model<EventDocument>
  ) {}

  async handle(event: GenreWasRemoved) {
    await this.events
      .findByIdAndUpdate(event.aggregateId, {
        $pull: { GenreIds: event.genreId },
      })
      .exec();
  }
}
