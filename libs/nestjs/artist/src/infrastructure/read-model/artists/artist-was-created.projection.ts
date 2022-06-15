import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ArtistWasCreated } from '../../../domain';
import { ArtistDocument, ARTISTS_PROJECTION } from './artist.schema';

@EventsHandler(ArtistWasCreated)
export class ArtistWasCreatedProjection
  implements IEventHandler<ArtistWasCreated>
{
  constructor(
    @InjectModel(ARTISTS_PROJECTION)
    private readonly Artists: Model<ArtistDocument>
  ) {}

  async handle(event: ArtistWasCreated) {
    const Artist = new this.Artists({ ...event.payload });

    await Artist.save();
  }
}
