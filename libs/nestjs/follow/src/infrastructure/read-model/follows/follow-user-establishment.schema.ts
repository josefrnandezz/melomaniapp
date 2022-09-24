import { Document, Schema } from 'mongoose';
import { FollowUserEstablishmentDTO } from '@melomaniapp/contracts/follow';

export const FOLLOWS_USER_ESTABLISHMENT_PROJECTION =
  'follows_user_establishment';

export type FollowUserEstablishmentDocument = FollowUserEstablishmentDTO &
  Document;

export const FollowUserEstablishmentSchema = new Schema(
  {
    _id: String,
    followedById: String,
    followedToId: String,
    establishment: {
      name: String,
      alias: String,
      description: String,
    },
  },
  {
    versionKey: false,
  }
);
