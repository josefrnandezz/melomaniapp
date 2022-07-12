import { Id } from '@aulasoftwarelibre/nestjs-eventstore';

export class UserId extends Id {
  public static fromString(id: string): UserId {
    return new UserId(id);
  }
}
