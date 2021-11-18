import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { EstablishmentAddressWasUpdated } from '../../../domain';
import {
  EstablishmentDocument,
  ESTABLISHMENTS_PROJECTION,
} from './establishment.schema';

@EventsHandler(EstablishmentAddressWasUpdated)
export class EstablishmentAddressWasUpdatedProjection
  implements IEventHandler<EstablishmentAddressWasUpdated>
{
  constructor(
    @InjectModel(ESTABLISHMENTS_PROJECTION)
    private readonly establishments: Model<EstablishmentDocument>
  ) {}

  async handle(event: EstablishmentAddressWasUpdated) {
    await this.establishments.findByIdAndUpdate(event.aggregateId, {
      address: {
        city: event.payload.city,
        full: event.payload.full,
      },
    });
  }
}
