import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ArtistAliasWasUpdated } from '../../../domain';
import { ArtistDocument, ARTISTS_PROJECTION } from './artist.schema';

@EventsHandler(ArtistAliasWasUpdated)
export class ArtistAliasWasUpdatedProjection
  implements IEventHandler<ArtistAliasWasUpdated>
{
  constructor(
    @InjectModel(ARTISTS_PROJECTION)
    private readonly artists: Model<ArtistDocument>
  ) {}

  async handle(event: ArtistAliasWasUpdated) {
    await this.artists
      .findByIdAndUpdate(event.aggregateId, {
        alias: event.alias,
      })
      .exec();
  }
}
