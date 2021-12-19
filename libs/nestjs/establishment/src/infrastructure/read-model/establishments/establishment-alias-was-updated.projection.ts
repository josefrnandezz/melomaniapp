import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { EstablishmentAliasWasUpdated } from '../../../domain';
import {
  EstablishmentDocument,
  ESTABLISHMENTS_PROJECTION,
} from './establishment.schema';

@EventsHandler(EstablishmentAliasWasUpdated)
export class EstablishmentAliasWasUpdatedProjection
  implements IEventHandler<EstablishmentAliasWasUpdated>
{
  constructor(
    @InjectModel(ESTABLISHMENTS_PROJECTION)
    private readonly establishments: Model<EstablishmentDocument>
  ) {}

  async handle(event: EstablishmentAliasWasUpdated) {
    await this.establishments
      .findByIdAndUpdate(event.aggregateId, {
        alias: event.alias,
      })
      .exec();
  }
}
