import { FollowType } from '@melomaniapp/contracts/follow';
import { ArtistDocument, ARTISTS_PROJECTION } from '@melomaniapp/nestjs/artist';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ArtistWasFollowedByArtist } from '../../../domain';
import {
  FollowArtistArtistDocument,
  FOLLOWS_ARTIST_ARTIST_PROJECTION,
} from './follow-artist-artist.schema';

@EventsHandler(ArtistWasFollowedByArtist)
export class ArtistWasFollowedByArtistProjection
  implements IEventHandler<ArtistWasFollowedByArtist>
{
  constructor(
    @InjectModel(FOLLOWS_ARTIST_ARTIST_PROJECTION)
    private readonly follows: Model<FollowArtistArtistDocument>,
    @InjectModel(ARTISTS_PROJECTION)
    private readonly artists: Model<ArtistDocument>
  ) {}

  async handle(event: ArtistWasFollowedByArtist) {
    const artist = await this.artists
      .findById(event.payload.followedToId)
      .select({
        _id: true,
        name: true,
        alias: true,
        description: true,
        imageUrl: true,
      })
      .lean();

    const follow = new this.follows({
      _id: event.payload._id,
      followedById: event.payload.followedById,
      followedToId: event.payload.followedToId,
      artist: {
        name: artist.name,
        alias: artist.alias,
        description: artist.description,
        imageUrl: artist.imageUrl,
      },
    });

    await follow.save();
  }
}
