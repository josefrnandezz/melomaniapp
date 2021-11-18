import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { EstablishmentSlugWasUpdated } from '../../../domain';
import {
  EstablishmentDocument,
  ESTABLISHMENTS_PROJECTION,
} from './establishment.schema';

@EventsHandler(EstablishmentSlugWasUpdated)
export class EstablishmentSlugWasUpdatedProjection
  implements IEventHandler<EstablishmentSlugWasUpdated>
{
  constructor(
    @InjectModel(ESTABLISHMENTS_PROJECTION)
    private readonly establishments: Model<EstablishmentDocument>
  ) {}

  async handle(event: EstablishmentSlugWasUpdated) {
    await this.establishments
      .findByIdAndUpdate(event.aggregateId, {
        slug: event.payload.slug,
      })
      .exec();
  }
}
