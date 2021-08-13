import { Id } from '@aulasoftwarelibre/nestjs-eventstore';

export class OwnerId extends Id {
  public static fromString(id: string): OwnerId {
    return new OwnerId(id);
  }
}
