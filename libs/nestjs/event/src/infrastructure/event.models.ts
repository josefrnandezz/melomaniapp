import { ArtistSchema, ARTISTS_PROJECTION } from '@melomaniapp/nestjs/artist';
import { ModelDefinition } from '@nestjs/mongoose';
import { GenreSchema, GENRES_PROJECTION } from '@melomaniapp/nestjs/genre';
import { EventSchema, EVENTS_PROJECTION } from '../infrastructure/read-model';

export const eventModels: ModelDefinition[] = [
  {
    name: GENRES_PROJECTION,
    schema: GenreSchema,
  },
  {
    name: ARTISTS_PROJECTION,
    schema: ArtistSchema,
  },
  {
    name: EVENTS_PROJECTION,
    schema: EventSchema,
  },
];
