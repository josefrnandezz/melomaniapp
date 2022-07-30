import { DomainError } from '@aulasoftwarelibre/nestjs-eventstore';

export class EventDateError extends DomainError {
  public static with(startsAt: Date, endsAt: Date): EventDateError {
    return new EventDateError(
      `Event date is not valid. startsAt: ${startsAt} endsAt: ${endsAt}`
    );
  }
}
