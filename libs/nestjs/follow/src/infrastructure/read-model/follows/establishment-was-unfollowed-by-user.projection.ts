import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EstablishmentWasUnfollowedByUser } from '../../../domain';
import {
  FOLLOWS_USER_ESTABLISHMENT_PROJECTION,
  FollowUserEstablishmentDocument,
} from './follow-user-establishment.schema';

@EventsHandler(EstablishmentWasUnfollowedByUser)
export class EstablishmentWasUnfollowedByUserProjection
  implements IEventHandler<EstablishmentWasUnfollowedByUser>
{
  constructor(
    @InjectModel(FOLLOWS_USER_ESTABLISHMENT_PROJECTION)
    private readonly follows: Model<FollowUserEstablishmentDocument>
  ) {}

  async handle(event: EstablishmentWasUnfollowedByUser) {
    await this.follows.findByIdAndDelete(event.aggregateId).exec();
  }
}
