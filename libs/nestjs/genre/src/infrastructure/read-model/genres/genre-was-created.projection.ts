import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { GenreWasCreated } from '../../../domain';
import { GenreDocument, GENRES_PROJECTION } from './genre.schema';

@EventsHandler(GenreWasCreated)
export class GenreWasCreatedProjection
  implements IEventHandler<GenreWasCreated>
{
  constructor(
    @InjectModel(GENRES_PROJECTION)
    private readonly genres: Model<GenreDocument>
  ) {}

  async handle(event: GenreWasCreated) {
    const genre = new this.genres({ ...event.payload });

    await genre.save();
  }
}
