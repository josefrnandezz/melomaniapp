import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export class EventWasCancelled extends Event {
  constructor(public readonly id: string) {
    super(id);
  }
}
