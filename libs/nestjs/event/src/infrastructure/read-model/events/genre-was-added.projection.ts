import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { GenreWasAdded } from '../../../domain';
import { EventDocument, EVENTS_PROJECTION } from './events.schema';

@EventsHandler(GenreWasAdded)
export class GenreWasAddedProjection implements IEventHandler<GenreWasAdded> {
  constructor(
    @InjectModel(EVENTS_PROJECTION)
    private readonly events: Model<EventDocument>
  ) {}

  async handle(event: GenreWasAdded) {
    await this.events
      .findByIdAndUpdate(event.aggregateId, {
        $push: { GenreIds: event.genreId },
      })
      .exec();
  }
}
