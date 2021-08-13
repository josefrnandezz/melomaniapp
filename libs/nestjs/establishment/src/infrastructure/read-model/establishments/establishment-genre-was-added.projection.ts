import { IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { EstablishmentGenreWasAdded } from '../../../domain';
import {
  EstablishmentDocument,
  ESTABLISHMENTS_PROJECTION,
} from './establishment.schema';

export class EstablishmentGenreWasAddedProjection
  implements IEventHandler<EstablishmentGenreWasAdded>
{
  constructor(
    @InjectModel(ESTABLISHMENTS_PROJECTION)
    private readonly establishments: Model<EstablishmentDocument>
  ) {}

  async handle(event: EstablishmentGenreWasAdded) {
    await this.establishments
      .findByIdAndUpdate(event.aggregateId, {
        $push: { genreIds: event.genreId },
      })
      .exec();
  }
}
