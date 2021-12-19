import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export type UserCityWasUpdatedProps = {
  city: string;
};

export class UserCityWasUpdated extends Event<UserCityWasUpdatedProps> {
  constructor(public readonly id: string, public readonly city: string) {
    super(id, { city });
  }
}
