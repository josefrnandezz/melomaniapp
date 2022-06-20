import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ArtistWasDeleted } from '../../../domain';
import { ArtistDocument, ARTISTS_PROJECTION } from './artist.schema';

@EventsHandler(ArtistWasDeleted)
export class ArtistWasDeletedProjection
  implements IEventHandler<ArtistWasDeleted>
{
  constructor(
    @InjectModel(ARTISTS_PROJECTION)
    private readonly artists: Model<ArtistDocument>
  ) {}

  async handle(event: ArtistWasDeleted) {
    await this.artists.findByIdAndDelete(event.id).exec();
  }
}
