import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { EstablishmentGenreWasRemoved } from '../../../domain';
import {
  EstablishmentDocument,
  ESTABLISHMENTS_PROJECTION,
} from './establishment.schema';

@EventsHandler(EstablishmentGenreWasRemoved)
export class EstablishmentGenreWasRemovedProjection
  implements IEventHandler<EstablishmentGenreWasRemoved>
{
  constructor(
    @InjectModel(ESTABLISHMENTS_PROJECTION)
    private readonly establishments: Model<EstablishmentDocument>
  ) {}

  async handle(event: EstablishmentGenreWasRemoved) {
    await this.establishments
      .findByIdAndUpdate(event.aggregateId, {
        $pull: { genreIds: event.genreId },
      })
      .exec();
  }
}
