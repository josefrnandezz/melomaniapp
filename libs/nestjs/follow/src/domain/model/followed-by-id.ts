import { Id } from '@aulasoftwarelibre/nestjs-eventstore';

export class FollowedById extends Id {
  public static fromString(id: string): FollowedById {
    return new FollowedById(id);
  }
}
