import { FollowType } from '@melomaniapp/contracts/follow';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenreWasFollowedByUser } from '../../../domain';
import { FollowDocument, FOLLOWS_PROJECTION } from './follows.schema';

@EventsHandler(GenreWasFollowedByUser)
export class GenreWasFollowedByUserProjection
  implements IEventHandler<GenreWasFollowedByUser>
{
  constructor(
    @InjectModel(FOLLOWS_PROJECTION)
    private readonly follows: Model<FollowDocument>
  ) {}

  async handle(event: GenreWasFollowedByUser) {
    const follow = new this.follows({
      _id: event.payload._id,
      followedById: event.payload.followedById,
      followedByType: FollowType.User,
      followedToId: event.payload.followedToId,
      followedToType: FollowType.Genre,
    });

    await follow.save();
  }
}
