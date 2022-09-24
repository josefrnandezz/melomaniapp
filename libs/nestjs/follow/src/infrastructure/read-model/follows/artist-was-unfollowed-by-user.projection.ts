import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ArtistWasUnfollowedByUser } from '../../../domain';
import {
  FOLLOWS_USER_ARTIST_PROJECTION,
  FollowUserArtistDocument,
} from './follow-user-artist.schema';

@EventsHandler(ArtistWasUnfollowedByUser)
export class ArtistWasUnfollowedByUserProjection
  implements IEventHandler<ArtistWasUnfollowedByUser>
{
  constructor(
    @InjectModel(FOLLOWS_USER_ARTIST_PROJECTION)
    private readonly follows: Model<FollowUserArtistDocument>
  ) {}

  async handle(event: ArtistWasUnfollowedByUser) {
    await this.follows.findByIdAndDelete(event.aggregateId).exec();
  }
}
