export enum FollowType {
  User = 1,
  Artist = 2,
  Genre = 3,
  Establishment = 4,
  Event = 5,
}

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
