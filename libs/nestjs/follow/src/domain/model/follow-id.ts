import { Id } from '@aulasoftwarelibre/nestjs-eventstore';

export class FollowId extends Id {
  public static fromString(id: string): FollowId {
    return new FollowId(id);
  }
}
