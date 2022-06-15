import { CreateArtistHandler } from './create-artist.handler';

export * from './create-artist.command';
export * from './create-artist.handler';

export const commandHandlers = [CreateArtistHandler];
