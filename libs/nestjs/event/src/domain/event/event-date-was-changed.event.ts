import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export interface EventDateWasChangedProps {
  startsAt: Date;
  endsAt: Date;
}

export class EventDateWasChanged extends Event<EventDateWasChangedProps> {
  constructor(
    public readonly id: string,
    public readonly startsAt: Date,
    public readonly endsAt: Date
  ) {
    super(id, {
      startsAt,
      endsAt,
    });
  }
}
