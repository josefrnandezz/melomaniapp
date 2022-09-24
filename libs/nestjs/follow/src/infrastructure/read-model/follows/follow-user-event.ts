import { Document, Schema } from 'mongoose';
import { FollowUserEventDTO } from '@melomaniapp/contracts/follow';

export const FOLLOWS_USER_EVENT_PROJECTION = 'follows_user_event';

export type FollowUserEventDocument = FollowUserEventDTO & Document;

export const FollowUserEventSchema = new Schema(
  {
    _id: String,
    followedById: String,
    followedToId: String,
    event: {
      name: String,
      description: String,
    },
  },
  {
    versionKey: false,
  }
);
