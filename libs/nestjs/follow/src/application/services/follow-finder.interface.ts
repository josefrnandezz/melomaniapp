import { FollowId } from '../../domain';
import { FollowDTO } from '@melomaniapp/contracts/follow';
import { EventId } from '@melomaniapp/nestjs/event';

export const FOLLOW_FINDER = 'FOLLOW_FINDER';

export interface IFollowFinder {
  find(id: FollowId): Promise<FollowDTO | null>;
  findFollowersByEvent(eventId: EventId): Promise<FollowDTO[]>;
}
