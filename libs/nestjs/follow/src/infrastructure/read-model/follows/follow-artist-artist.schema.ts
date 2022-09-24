import { Document, Schema } from 'mongoose';
import { FollowArtistArtistDTO } from '@melomaniapp/contracts/follow';

export const FOLLOWS_ARTIST_ARTIST_PROJECTION = 'follows_artist_artist';

export type FollowArtistArtistDocument = FollowArtistArtistDTO & Document;

export const FollowArtistArtistSchema = new Schema(
  {
    _id: String,
    followedById: String,
    followedToId: String,
    artist: {
      name: String,
      alias: String,
      description: String,
      imageUrl: String,
    },
  },
  {
    versionKey: false,
  }
);
