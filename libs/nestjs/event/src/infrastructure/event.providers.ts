import { Provider } from '@nestjs/common';
import { EVENT_FINDER } from '../application';
import { EventFinder } from './services';

export const eventProviders: Provider[] = [
  {
    provide: EVENT_FINDER,
    useClass: EventFinder,
  },
];
