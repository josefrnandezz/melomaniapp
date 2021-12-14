import { EstablishmentDTO } from '@melomaniapp/contracts/establishment';
import { Document, Schema } from 'mongoose';

export const ESTABLISHMENTS_PROJECTION = 'establishments';

export type EstablishmentDocument = EstablishmentDTO & Document;

export const EstablishmentSchema = new Schema(
  {
    _id: String,
    ownerId: String,
    name: String,
    slug: { type: String, index: { unique: true } },
    description: String,
    email: { type: String, index: { unique: true } },
    address: {
      full: String,
      city: String,
    },
    genreIds: [String],
  },
  {
    versionKey: false,
  }
);
