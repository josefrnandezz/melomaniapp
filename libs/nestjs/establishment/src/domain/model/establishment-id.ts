import { Id } from '@aulasoftwarelibre/nestjs-eventstore';

export class EstablishmentId extends Id {
  public static fromString(id: string): EstablishmentId {
    return new EstablishmentId(id);
  }
}
