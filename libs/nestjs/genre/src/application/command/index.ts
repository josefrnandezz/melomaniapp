import { CreateGenreHandler } from './create-genre.handler';
import { DeleteGenreHandler } from './delete-genre.handler';
import { UpdateGenreHandler } from './update-genre.handler';

export * from './create-genre.command';
export * from './delete-genre.command';
export * from './update-genre.command';

export const commandHandlers = [
  CreateGenreHandler,
  DeleteGenreHandler,
  UpdateGenreHandler,
];
