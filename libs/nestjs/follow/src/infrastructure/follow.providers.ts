import { Provider } from '@nestjs/common';
import { FOLLOW_FINDER } from '../application';
import { FollowFinder } from './services';

export const followProviders: Provider[] = [
  {
    provide: FOLLOW_FINDER,
    useClass: FollowFinder,
  },
];
