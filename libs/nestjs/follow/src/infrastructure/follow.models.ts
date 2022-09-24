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
import {
  FOLLOWS_USER_ESTABLISHMENT_PROJECTION,
  FollowUserEstablishmentSchema,
} from './read-model/follows/follow-user-establishment.schema';
import {
  FOLLOWS_USER_GENRE_PROJECTION,
  FollowUserGenreSchema,
} from './read-model/follows/follow-user-genre.schema';
import {
  FOLLOWS_USER_EVENT_PROJECTION,
  FollowUserEventSchema,
} from './read-model/follows/follow-user-event';
import {
  FOLLOWS_USER_ARTIST_PROJECTION,
  FollowUserArtistSchema,
} from './read-model/follows/follow-user-artist.schema';
import {
  FollowArtistArtistSchema,
  FOLLOWS_ARTIST_ARTIST_PROJECTION,
} from './read-model/follows/follow-artist-artist.schema';

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
  {
    name: FOLLOWS_USER_ESTABLISHMENT_PROJECTION,
    schema: FollowUserEstablishmentSchema,
  },
  {
    name: FOLLOWS_USER_GENRE_PROJECTION,
    schema: FollowUserGenreSchema,
  },
  {
    name: FOLLOWS_USER_EVENT_PROJECTION,
    schema: FollowUserEventSchema,
  },
  {
    name: FOLLOWS_USER_ARTIST_PROJECTION,
    schema: FollowUserArtistSchema,
  },
  {
    name: FOLLOWS_ARTIST_ARTIST_PROJECTION,
    schema: FollowArtistArtistSchema,
  },
];
