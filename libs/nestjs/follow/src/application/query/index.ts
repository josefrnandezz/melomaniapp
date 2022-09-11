import { GetArtistFollowersHandler } from './get-artist-followers.handler';
import { GetEstablishmentFollowersHandler } from './get-establishment-followers.handler';
import { GetEventFollowersHandler } from './get-event-followers.handler';
import { GetGenreFollowersHandler } from './get-genre-followers.handler';
import { GetUserFollowsHandler } from './get-user-follows.handler';

export * from './get-event-followers.query';
export * from './get-establishment-followers.query';
export * from './get-artist-followers.query';
export * from './get-genre-followers.query';
export * from './get-user-follows.query';

export const queryHandlers = [
  GetEventFollowersHandler,
  GetEstablishmentFollowersHandler,
  GetArtistFollowersHandler,
  GetGenreFollowersHandler,
  GetUserFollowsHandler,
];
