import { FollowType } from '@melomaniapp/contracts/follow';

export const allowedFollows = [
  {
    by: FollowType.User,
    to: FollowType.Genre,
  },
  {
    by: FollowType.User,
    to: FollowType.Artist,
  },
  {
    by: FollowType.User,
    to: FollowType.Establishment,
  },
  {
    by: FollowType.User,
    to: FollowType.Event,
  },
  {
    by: FollowType.Artist,
    to: FollowType.Artist,
  },
];
