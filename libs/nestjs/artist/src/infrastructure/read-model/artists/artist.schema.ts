import { ArtistDTO } from '@melomaniapp/contracts/artist';
import { Document, Schema } from 'mongoose';

export const ARTISTS_PROJECTION = 'artists';

export type ArtistDocument = ArtistDTO & Document;

export const ArtistSchema = new Schema(
  {
    _id: String,
    userId: { type: String, required: true },
    name: String,
    alias: { type: String, index: { unique: true }, required: true },
    description: String,
    socialLinks: [String],
    genreIds: [String],
    imageUrl: String,
  },
  {
    versionKey: false,
  }
);
