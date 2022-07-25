import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ArtistWasAdded } from '../../../domain';
import { EventDocument, EVENTS_PROJECTION } from './events.schema';

@EventsHandler(ArtistWasAdded)
export class ArtistWasAddedProjection implements IEventHandler<ArtistWasAdded> {
  constructor(
    @InjectModel(EVENTS_PROJECTION)
    private readonly events: Model<EventDocument>
  ) {}

  async handle(event: ArtistWasAdded) {
    await this.events
      .findByIdAndUpdate(event.aggregateId, {
        $push: { artistIds: event.artistId },
      })
      .exec();
  }
}
