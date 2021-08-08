import { Provider } from '@nestjs/common';

import { GENRE_FINDER } from '../application/services';
import { GenreFinder } from './services';

export const genreProviders: Provider[] = [
  {
    provide: GENRE_FINDER,
    useClass: GenreFinder,
  },
];
