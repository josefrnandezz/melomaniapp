import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ArtistWasUnfollowedByArtist } from '../../../domain';
import {
  FollowArtistArtistDocument,
  FOLLOWS_ARTIST_ARTIST_PROJECTION,
} from './follow-artist-artist.schema';

@EventsHandler(ArtistWasUnfollowedByArtist)
export class ArtistWasUnfollowedByArtistProjection
  implements IEventHandler<ArtistWasUnfollowedByArtist>
{
  constructor(
    @InjectModel(FOLLOWS_ARTIST_ARTIST_PROJECTION)
    private readonly follows: Model<FollowArtistArtistDocument>
  ) {}

  async handle(event: ArtistWasUnfollowedByArtist) {
    await this.follows.findByIdAndDelete(event.aggregateId).exec();
  }
}
