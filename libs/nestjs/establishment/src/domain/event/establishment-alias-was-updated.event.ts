import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export type EstablishmentAliasWasUpdatedProps = {
  alias: string;
};

export class EstablishmentAliasWasUpdated extends Event<EstablishmentAliasWasUpdatedProps> {
  constructor(public readonly id: string, public readonly alias: string) {
    super(id, { alias });
  }
}
