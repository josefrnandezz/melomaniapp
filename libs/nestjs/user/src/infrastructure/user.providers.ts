import { Provider } from '@nestjs/common';

import { USER_FINDER } from '../application';
import { UserFinder } from './services';

export const userProviders: Provider[] = [
  {
    provide: USER_FINDER,
    useClass: UserFinder,
  },
];
