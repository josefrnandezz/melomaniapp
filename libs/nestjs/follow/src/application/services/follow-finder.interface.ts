import { FollowId } from '../../domain';
import { FollowDTO } from '@melomaniapp/contracts/follow';

export const FOLLOW_FINDER = 'FOLLOW_FINDER';

export interface IFollowFinder {
  find(id: FollowId): Promise<FollowDTO | null>;
}
