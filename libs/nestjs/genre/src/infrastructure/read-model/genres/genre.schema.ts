import { GenreDTO } from '@melomaniapp/contracts/genre';
import { Document, Schema } from 'mongoose';

export const GENRES_PROJECTION = 'genres';

export type GenreDocument = GenreDTO & Document;

export const GenreSchema = new Schema(
  {
    _id: String,
    name: String,
  },
  {
    versionKey: false,
  }
);
