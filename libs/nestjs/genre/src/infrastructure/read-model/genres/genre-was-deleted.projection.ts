import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { GenreWasDeleted } from '../../../domain';
import { GenreDocument, GENRES_PROJECTION } from './genre.schema';

@EventsHandler(GenreWasDeleted)
export class GenreWasDeletedProjection
  implements IEventHandler<GenreWasDeleted>
{
  constructor(
    @InjectModel(GENRES_PROJECTION)
    public readonly genres: Model<GenreDocument>
  ) {}

  async handle(event: GenreWasDeleted) {
    await this.genres.findByIdAndDelete(event.aggregateId).exec();
  }
}
