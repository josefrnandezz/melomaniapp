import { GetArtistHandler } from './get-artist-handler';
import { GetArtistsHandler } from './get-artists-handler';

export * from './get-artist-query';
export * from './get-artists-query';

export const queryHandlers = [GetArtistHandler, GetArtistsHandler];
