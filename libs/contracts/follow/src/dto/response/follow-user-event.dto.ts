interface EventProps {
  name: string;
  description: string;
}

interface Props {
  _id: string;
  followedById: string;
  followedToId: string;
  event: EventProps;
}

export class FollowUserEventDTO {
  constructor(props: Props) {
    Object.assign(this, props);
  }

  public readonly _id: string;

  public readonly followedById: string;

  public readonly followedToId: string;

  public readonly event: EventProps;
}
