export enum FollowType {
  User = 1,
  Artist = 2,
  Genre = 3,
  Establishment = 4,
  Event = 5,
}

interface Props {
  _id: string;
  followedById: string;
  followedByType: FollowType;
  followedToId: string;
  followedToType: FollowType;
}

export class FollowDTO {
  constructor(props: Props) {
    Object.assign(this, props);
  }

  public readonly _id: string;

  public readonly followedById: string;

  public readonly followedByType: FollowType;

  public readonly followedToId: string;

  public readonly followedToType: FollowType;
}
