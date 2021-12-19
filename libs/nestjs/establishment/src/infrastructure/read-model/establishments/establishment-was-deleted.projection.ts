import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { EstablishmentWasDeleted } from '../../../domain';
import {
  EstablishmentDocument,
  ESTABLISHMENTS_PROJECTION,
} from './establishment.schema';

@EventsHandler(EstablishmentWasDeleted)
export class EstablishmentWasDeletedProjection
  implements IEventHandler<EstablishmentWasDeleted>
{
  constructor(
    @InjectModel(ESTABLISHMENTS_PROJECTION)
    public readonly establishments: Model<EstablishmentDocument>
  ) {}

  async handle(event: EstablishmentWasDeleted) {
    await this.establishments.findByIdAndDelete(event.aggregateId).exec();
  }
}
