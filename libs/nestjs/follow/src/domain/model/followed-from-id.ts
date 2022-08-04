import { Id } from '@aulasoftwarelibre/nestjs-eventstore';

export class FollowedFromId extends Id {
  public static fromString(id: string): FollowedFromId {
    return new FollowedFromId(id);
  }
}
