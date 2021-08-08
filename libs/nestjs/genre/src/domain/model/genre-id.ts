import { Id } from '@aulasoftwarelibre/nestjs-eventstore';

export class GenreId extends Id {
  public static fromString(id: string): GenreId {
    return new GenreId(id);
  }
}
