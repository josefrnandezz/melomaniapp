import { Provider } from '@nestjs/common';

import { ARTIST_FINDER } from '../application/services/artist-finder.interface';
import { ArtistFinder } from './services';

export const artistProviders: Provider[] = [
  {
    provide: ARTIST_FINDER,
    useClass: ArtistFinder,
  },
];
