import { Document, Schema } from 'mongoose';
import { FollowUserArtistDTO } from '@melomaniapp/contracts/follow';

export const FOLLOWS_USER_ARTIST_PROJECTION = 'follows_user_artist';

export type FollowUserArtistDocument = FollowUserArtistDTO & Document;

export const FollowUserArtistSchema = new Schema(
  {
    _id: String,
    followedById: String,
    followedToId: String,
    artist: {
      name: String,
      alias: String,
      description: String,
    },
  },
  {
    versionKey: false,
  }
);
