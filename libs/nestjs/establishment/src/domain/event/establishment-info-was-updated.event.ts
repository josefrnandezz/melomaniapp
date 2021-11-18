import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export type EstablishmentInfoWasUpdatedProps = {
  name: string;
  description: string;
};

export class EstablishmentInfoWasUpdated extends Event<EstablishmentInfoWasUpdatedProps> {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string
  ) {
    super(id, { name, description });
  }
}
