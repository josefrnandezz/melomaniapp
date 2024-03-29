import { CreateArtistHandler } from './create-artist.handler';
import { DeleteArtistHandler } from './delete-artist.handler';
import { UpdateArtistHandler } from './update-artist.handler';

export * from './create-artist.command';
export * from './delete-artist.command';
export * from './update-artist.command';

export const commandHandlers = [
  CreateArtistHandler,
  UpdateArtistHandler,
  DeleteArtistHandler,
];
