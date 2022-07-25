import { CreateEventDTO } from '@melomaniapp/contracts/event';
import { Event } from '@aulasoftwarelibre/nestjs-eventstore';
import { AddressProps } from '@melomaniapp/nestjs/common';

export interface EventWasCreatedProps extends CreateEventDTO {
  userId: string;
}

export class EventWasCreated extends Event<EventWasCreatedProps> {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly name: string,
    public readonly description: string,
    public readonly startsAt: Date,
    public readonly endsAt: Date,
    public readonly address: AddressProps,
    public readonly establishmentId: string
  ) {
    super(id, {
      _id: id,
      userId,
      name,
      description,
      startsAt,
      endsAt,
      address,
      establishmentId,
      artistIds: [],
      genreIds: [],
    });
  }
}
