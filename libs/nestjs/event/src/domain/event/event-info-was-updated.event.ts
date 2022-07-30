import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export interface EventInfoWasUpdatedProps {
  name: string;
  description: string;
}

export class EventInfoWasUpdated extends Event<EventInfoWasUpdatedProps> {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string
  ) {
    super(id, {
      name,
      description,
    });
  }
}
