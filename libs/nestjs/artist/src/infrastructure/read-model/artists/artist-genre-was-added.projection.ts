import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ArtistGenreWasAdded } from '../../../domain';
import { ArtistDocument, ARTISTS_PROJECTION } from './artist.schema';

@EventsHandler(ArtistGenreWasAdded)
export class ArtistGenreWasAddedProjection
  implements IEventHandler<ArtistGenreWasAdded>
{
  constructor(
    @InjectModel(ARTISTS_PROJECTION)
    private readonly artists: Model<ArtistDocument>
  ) {}

  async handle(event: ArtistGenreWasAdded) {
    await this.artists
      .findByIdAndUpdate(event.aggregateId, {
        $push: { genreIds: event.genreId },
      })
      .exec();
  }
}
