import { FollowGenreByUserHandler } from './follow-genre-by-user.handler';
import { UnfollowGenreByUserHandler } from './unfollow-genre-by-user.handler';

export * from './follow-genre-by-user.command';
export * from './unfollow-genre-by-user.command';

export const commandHandlers = [
  FollowGenreByUserHandler,
  UnfollowGenreByUserHandler,
];
