import { FollowedToId, FollowId } from '../../domain';
import { FollowedFromId } from '../../domain/model/followed-from-id';
import { FollowDTO } from '@melomaniapp/contracts/follow';

export const FOLLOW_FINDER = 'FOLLOW_FINDER';

export interface IFollowFinder {
  find(id: FollowId): Promise<FollowDTO | null>;
  findActiveFollow(
    from: FollowedFromId,
    to: FollowedToId
  ): Promise<FollowDTO | null>;
}
