import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { EstablishmentEmailWasUpdated } from '../../../domain';
import {
  EstablishmentDocument,
  ESTABLISHMENTS_PROJECTION,
} from './establishment.schema';

@EventsHandler(EstablishmentEmailWasUpdated)
export class EstablishmentEmailWasUpdatedProjection
  implements IEventHandler<EstablishmentEmailWasUpdated>
{
  constructor(
    @InjectModel(ESTABLISHMENTS_PROJECTION)
    private readonly establishments: Model<EstablishmentDocument>
  ) {}

  public async handle(event: EstablishmentEmailWasUpdated) {
    await this.establishments
      .findByIdAndUpdate(event.aggregateId, {
        email: event.payload.email,
      })
      .exec();
  }
}
