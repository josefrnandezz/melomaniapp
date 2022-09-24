import { ArtistDocument, ARTISTS_PROJECTION } from '@melomaniapp/nestjs/artist';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ArtistWasFollowedByUser } from '../../../domain';
import {
  FOLLOWS_USER_ARTIST_PROJECTION,
  FollowUserArtistDocument,
} from './follow-user-artist.schema';

@EventsHandler(ArtistWasFollowedByUser)
export class ArtistWasFollowedByUserProjection
  implements IEventHandler<ArtistWasFollowedByUser>
{
  constructor(
    @InjectModel(FOLLOWS_USER_ARTIST_PROJECTION)
    private readonly follows: Model<FollowUserArtistDocument>,
    @InjectModel(ARTISTS_PROJECTION)
    private readonly artists: Model<ArtistDocument>
  ) {}

  async handle(event: ArtistWasFollowedByUser) {
    const artist = await this.artists
      .findById(event.payload.followedToId)
      .select({ _id: true, name: true, alias: true, description: true })
      .lean();

    const follow = new this.follows({
      _id: event.payload._id,
      followedById: event.payload.followedById,
      followedToId: event.payload.followedToId,
      artist: {
        name: artist.name,
        alias: artist.alias,
        description: artist.description,
      },
    });

    await follow.save();
  }
}
