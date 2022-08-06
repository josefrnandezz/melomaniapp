import { FollowType } from '@melomaniapp/contracts/follow';

export const allowedFollows = [
  {
    from: FollowType.User,
    to: FollowType.Genre,
  },
  {
    from: FollowType.User,
    to: FollowType.Artist,
  },
  {
    from: FollowType.User,
    to: FollowType.Establishment,
  },
  {
    from: FollowType.User,
    to: FollowType.Event,
  },
  {
    from: FollowType.Artist,
    to: FollowType.Artist,
  },
];
