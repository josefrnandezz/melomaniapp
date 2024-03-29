import { EventDTO } from '@melomaniapp/contracts/event';
import { Document, Schema } from 'mongoose';

export const EVENTS_PROJECTION = 'events';

export type EventDocument = EventDTO & Document;

export const EventSchema = new Schema(
  {
    _id: String,
    userId: String,
    name: String,
    description: String,
    startsAt: Date,
    endsAt: Date,
    address: {
      full: String,
      city: String,
    },
    artistIds: [String],
    establishmentId: String,
    genreIds: [String],
    isCancelled: Boolean,
  },
  {
    versionKey: false,
  }
);
