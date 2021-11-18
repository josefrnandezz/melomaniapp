import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export type EstablishmentAddressWasUpdatedProps = {
  full: string;
  city: string;
};

export class EstablishmentAddressWasUpdated extends Event<EstablishmentAddressWasUpdatedProps> {
  constructor(
    public readonly id: string,
    public readonly full: string,
    public readonly city: string
  ) {
    super(id, {
      full,
      city,
    });
  }
}
