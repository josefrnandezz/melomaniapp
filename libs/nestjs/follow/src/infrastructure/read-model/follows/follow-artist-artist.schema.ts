import { Document, Schema } from 'mongoose';
import { FollowArtistArtistDTO } from '@melomaniapp/contracts/follow';

export const FOLLOWS_ARTIST_ARTIST_PROJECTION = 'follows_artist_artist';

export type FollowArtistArtistDocument = FollowArtistArtistDTO & Document;

export const FollowArtistArtistSchema = new Schema(
  {
    _id: String,
    followedBy: {
      _id: String,
      name: String,
      alias: String,
      description: String,
      imageUrl: String,
    },
    followedTo: {
      _id: String,
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
