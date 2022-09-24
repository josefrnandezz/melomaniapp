import {
  EstablishmentDocument,
  ESTABLISHMENTS_PROJECTION,
} from '@melomaniapp/nestjs/establishment';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EstablishmentWasFollowedByUser } from '../../../domain';
import {
  FollowUserEstablishmentDocument,
  FOLLOWS_USER_ESTABLISHMENT_PROJECTION,
} from './follow-user-establishment.schema';

@EventsHandler(EstablishmentWasFollowedByUser)
export class EstablishmentWasFollowedByUserProjection
  implements IEventHandler<EstablishmentWasFollowedByUser>
{
  constructor(
    @InjectModel(FOLLOWS_USER_ESTABLISHMENT_PROJECTION)
    private readonly follows: Model<FollowUserEstablishmentDocument>,
    @InjectModel(ESTABLISHMENTS_PROJECTION)
    private readonly establishments: Model<EstablishmentDocument>
  ) {}

  async handle(event: EstablishmentWasFollowedByUser) {
    const establishment = await this.establishments
      .findById(event.payload.followedToId)
      .select({ _id: true, name: true, alias: true, description: true })
      .lean();

    const follow = new this.follows({
      _id: event.payload._id,
      followedById: event.payload.followedById,
      followedToId: event.payload.followedToId,
      establishment: {
        name: establishment.name,
        alias: establishment.alias,
        description: establishment.description,
      },
    });

    await follow.save();
  }
}
