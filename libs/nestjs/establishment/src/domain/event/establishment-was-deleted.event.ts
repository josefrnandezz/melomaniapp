import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export class EstablishmentWasDeleted extends Event {
  constructor(public readonly id: string) {
    super(id);
  }
}
