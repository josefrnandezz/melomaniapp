import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ArtistPersonalInfoWasUpdated } from '../../../domain';
import { ArtistDocument, ARTISTS_PROJECTION } from './artist.schema';

@EventsHandler(ArtistPersonalInfoWasUpdated)
export class ArtistPersonalInfoWasUpdatedProjection
  implements IEventHandler<ArtistPersonalInfoWasUpdated>
{
  constructor(
    @InjectModel(ARTISTS_PROJECTION)
    private readonly artists: Model<ArtistDocument>
  ) {}

  async handle(event: ArtistPersonalInfoWasUpdated) {
    await this.artists.findByIdAndUpdate(event.id, {
      name: event.name,
      description: event.description,
    });
  }
}
