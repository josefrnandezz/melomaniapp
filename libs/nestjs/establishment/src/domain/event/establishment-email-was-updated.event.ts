import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export type EstablishmentEmailWasUpdatedProps = {
  email: string;
};

export class EstablishmentEmailWasUpdated extends Event<EstablishmentEmailWasUpdatedProps> {
  constructor(public readonly id: string, public readonly email: string) {
    super(id, { email });
  }
}
