import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ArtistWasRemoved } from '../../../domain';
import { EventDocument, EVENTS_PROJECTION } from './events.schema';

@EventsHandler(ArtistWasRemoved)
export class ArtistWasRemovedProjection
  implements IEventHandler<ArtistWasRemoved>
{
  constructor(
    @InjectModel(EVENTS_PROJECTION)
    private readonly events: Model<EventDocument>
  ) {}

  async handle(event: ArtistWasRemoved) {
    await this.events
      .findByIdAndUpdate(event.aggregateId, {
        $pull: { artistIds: event.artistId },
      })
      .exec();
  }
}
