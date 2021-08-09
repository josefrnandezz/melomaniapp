import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { GenreNameWasUpdated } from '../../../domain';
import { GenreDocument, GENRES_PROJECTION } from './genre.schema';

@EventsHandler(GenreNameWasUpdated)
export class GenreNameWasUpdatedProjection
  implements IEventHandler<GenreNameWasUpdated>
{
  constructor(
    @InjectModel(GENRES_PROJECTION)
    private readonly genres: Model<GenreDocument>
  ) {}

  async handle(event: GenreNameWasUpdated) {
    await this.genres
      .findByIdAndUpdate(event.aggregateId, {
        name: event.name,
      })
      .exec();
  }
}
