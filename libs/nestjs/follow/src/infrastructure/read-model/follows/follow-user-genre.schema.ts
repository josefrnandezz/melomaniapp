import { Document, Schema } from 'mongoose';
import { FollowUserGenreDTO } from '@melomaniapp/contracts/follow';

export const FOLLOWS_USER_GENRE_PROJECTION = 'follows_user_genre';

export type FollowUserGenreDocument = FollowUserGenreDTO & Document;

export const FollowUserGenreSchema = new Schema(
  {
    _id: String,
    followedById: String,
    followedToId: String,
    genre: {
      name: String,
    },
  },
  {
    versionKey: false,
  }
);
