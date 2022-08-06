import { FollowDTO } from '@melomaniapp/contracts/follow';
import { Document, Schema } from 'mongoose';

export const FOLLOWS_PROJECTION = 'follows';

export type FollowDocument = FollowDTO & Document;

export const FollowSchema = new Schema(
  {
    _id: String,
    followedToId: String,
    followedToType: Number,
    followedById: String,
    followedByType: Number,
  },
  {
    versionKey: false,
  }
);
