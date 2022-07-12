import { Id } from '@aulasoftwarelibre/nestjs-eventstore';

export class EventId extends Id {
  public static fromString(id: string): EventId {
    return new EventId(id);
  }
}
