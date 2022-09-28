import { ArtistFinder, ARTIST_FINDER } from '@melomaniapp/nestjs/artist';
import { Provider } from '@nestjs/common';
import { UserFinder, USER_FINDER } from '@melomaniapp/nestjs/user';
import { FOLLOW_FINDER } from '../application';
import { FollowFinder } from './services';
import { GenreFinder, GENRE_FINDER } from '@melomaniapp/nestjs/genre';
import { EVENT_FINDER, EventFinder } from '@melomaniapp/nestjs/event';
import {
  ESTABLISHMENT_FINDER,
  EstablishmentFinder,
} from '@melomaniapp/nestjs/establishment';

export const followProviders: Provider[] = [
  {
    provide: USER_FINDER,
    useClass: UserFinder,
  },
  {
    provide: FOLLOW_FINDER,
    useClass: FollowFinder,
  },
  {
    provide: ARTIST_FINDER,
    useClass: ArtistFinder,
  },
  {
    provide: GENRE_FINDER,
    useClass: GenreFinder,
  },
  {
    provide: EVENT_FINDER,
    useClass: EventFinder,
  },
  {
    provide: ESTABLISHMENT_FINDER,
    useClass: EstablishmentFinder,
  },
];
