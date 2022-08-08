import { FollowType } from '@melomaniapp/contracts/follow';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ArtistWasFollowedByArtist } from '../../../domain';
import { FollowDocument, FOLLOWS_PROJECTION } from './follows.schema';

@EventsHandler(ArtistWasFollowedByArtist)
export class ArtistWasFollowedByArtistProjection
  implements IEventHandler<ArtistWasFollowedByArtist>
{
  constructor(
    @InjectModel(FOLLOWS_PROJECTION)
    private readonly follows: Model<FollowDocument>
  ) {}

  async handle(event: ArtistWasFollowedByArtist) {
    const follow = new this.follows({
      _id: event.payload._id,
      followedById: event.payload.followedById,
      followedByType: FollowType.Artist,
      followedToId: event.payload.followedToId,
      followedToType: FollowType.Artist,
    });

    await follow.save();
  }
}
