import { Provider } from '@nestjs/common';

import { ESTABLISHMENT_FINDER } from '../application/services/establishment-finder.interface';
import { EstablishmentFinder } from './services';

export const establishmentProviders: Provider[] = [
  {
    provide: ESTABLISHMENT_FINDER,
    useClass: EstablishmentFinder,
  },
];
