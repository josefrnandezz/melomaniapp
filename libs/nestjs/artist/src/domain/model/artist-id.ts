import { Id } from '@aulasoftwarelibre/nestjs-eventstore';

export class ArtistId extends Id {
  public static fromString(id: string): ArtistId {
    return new ArtistId(id);
  }
}
