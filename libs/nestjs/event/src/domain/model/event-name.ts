import { DomainError, ValueObject } from '@aulasoftwarelibre/nestjs-eventstore';

interface Props {
  value: string;
}

export class EventName extends ValueObject<Props> {
  public static fromString(name: string): EventName {
    if (name.length === 0) {
      throw DomainError.because('Event name cannot be empty');
    }

    if (!/^[a-zA-Z0-9ñÑ\s]+$/.test(name)) {
      throw DomainError.because('Invalid event name characters');
    }

    return new EventName({ value: name });
  }

  get value(): string {
    return this.props.value;
  }
}
