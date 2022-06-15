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
    private readonly artists: Model<ArtistDocument>
  ) {}

  async handle(event: ArtistWasCreated) {
    const artist = new this.artists({ ...event.payload });

    await artist.save();
  }
}
