import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { EstablishmentInfoWasUpdated } from '../../../domain';
import {
  EstablishmentDocument,
  ESTABLISHMENTS_PROJECTION,
} from './establishment.schema';

@EventsHandler(EstablishmentInfoWasUpdated)
export class EstablishmentInfoWasUpdatedProjection
  implements IEventHandler<EstablishmentInfoWasUpdated>
{
  constructor(
    @InjectModel(ESTABLISHMENTS_PROJECTION)
    private readonly establishments: Model<EstablishmentDocument>
  ) {}

  async handle(event: EstablishmentInfoWasUpdated) {
    await this.establishments
      .findByIdAndUpdate(event.aggregateId, {
        name: event.payload.name,
        description: event.payload.description,
      })
      .exec();
  }
}
