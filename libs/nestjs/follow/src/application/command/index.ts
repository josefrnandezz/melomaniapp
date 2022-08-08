import { FollowArtistByUserHandler } from './follow-artist-by-user.handler';
import { FollowGenreByUserHandler } from './follow-genre-by-user.handler';
import { UnfollowArtistByUserHandler } from './unfollow-artist-by-user.handler';
import { UnfollowGenreByUserHandler } from './unfollow-genre-by-user.handler';

export * from './follow-artist-by-user.command';
export * from './unfollow-artist-by-user.command';
export * from './follow-genre-by-user.command';
export * from './unfollow-genre-by-user.command';

export const commandHandlers = [
  FollowGenreByUserHandler,
  UnfollowGenreByUserHandler,
  FollowArtistByUserHandler,
  UnfollowArtistByUserHandler,
];
