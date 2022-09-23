import { ArtistSchema, ARTISTS_PROJECTION } from '@melomaniapp/nestjs/artist';
import { ModelDefinition } from '@nestjs/mongoose';
import {
  EstablishmentSchema,
  ESTABLISHMENTS_PROJECTION,
} from '@melomaniapp/nestjs/establishment';
import { EventSchema, EVENTS_PROJECTION } from '@melomaniapp/nestjs/event';
import { GenreSchema, GENRES_PROJECTION } from '@melomaniapp/nestjs/genre';
import { UserSchema, USERS_PROJECTION } from '@melomaniapp/nestjs/user';
import { FollowSchema, FOLLOWS_PROJECTION } from './read-model';

export const followModels: ModelDefinition[] = [
  {
    name: FOLLOWS_PROJECTION,
    schema: FollowSchema,
  },
  {
    name: USERS_PROJECTION,
    schema: UserSchema,
  },
  {
    name: GENRES_PROJECTION,
    schema: GenreSchema,
  },
  {
    name: ESTABLISHMENTS_PROJECTION,
    schema: EstablishmentSchema,
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
