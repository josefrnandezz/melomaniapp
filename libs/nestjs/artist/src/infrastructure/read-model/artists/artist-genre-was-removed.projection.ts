import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ArtistGenreWasRemoved } from '../../../domain';
import { ArtistDocument, ARTISTS_PROJECTION } from './artist.schema';

@EventsHandler(ArtistGenreWasRemoved)
export class ArtistGenreWasRemovedProjection
  implements IEventHandler<ArtistGenreWasRemoved>
{
  constructor(
    @InjectModel(ARTISTS_PROJECTION)
    private readonly artists: Model<ArtistDocument>
  ) {}

  async handle(event: ArtistGenreWasRemoved) {
    await this.artists
      .findByIdAndUpdate(event.aggregateId, {
        $pull: { genreIds: event.genreId },
      })
      .exec();
  }
}
