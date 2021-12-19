import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { EstablishmentWasCreated } from '../../../domain';
import {
  EstablishmentDocument,
  ESTABLISHMENTS_PROJECTION,
} from './establishment.schema';

@EventsHandler(EstablishmentWasCreated)
export class EstablishmentWasCreatedProjection
  implements IEventHandler<EstablishmentWasCreated>
{
  constructor(
    @InjectModel(ESTABLISHMENTS_PROJECTION)
    private readonly establishments: Model<EstablishmentDocument>
  ) {}

  async handle(event: EstablishmentWasCreated) {
    const establishment = new this.establishments({ ...event.payload });

    await establishment.save();
  }
}
