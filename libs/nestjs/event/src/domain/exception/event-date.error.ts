import { DomainError } from '@aulasoftwarelibre/nestjs-eventstore';

export class EventDateError extends DomainError {
  public static with(startsAt: Date, endsAt: Date): EventDateError {
    return new EventDateError(
      `Starting date ${startsAt} is later than ending date ${endsAt}`
    );
  }
}
