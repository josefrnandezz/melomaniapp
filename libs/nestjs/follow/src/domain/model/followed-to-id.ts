import { Id } from '@aulasoftwarelibre/nestjs-eventstore';

export class FollowedToId extends Id {
  public static fromString(id: string): FollowedToId {
    return new FollowedToId(id);
  }
}
