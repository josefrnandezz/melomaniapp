import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EstablishmentWasUnfollowedByUser } from '../../../domain';
import { FollowDocument, FOLLOWS_PROJECTION } from './follows.schema';

@EventsHandler(EstablishmentWasUnfollowedByUser)
export class EstablishmentWasUnfollowedByUserProjection
  implements IEventHandler<EstablishmentWasUnfollowedByUser>
{
  constructor(
    @InjectModel(FOLLOWS_PROJECTION)
    private readonly follows: Model<FollowDocument>
  ) {}

  async handle(event: EstablishmentWasUnfollowedByUser) {
    await this.follows.findByIdAndDelete(event.aggregateId).exec();
  }
}
