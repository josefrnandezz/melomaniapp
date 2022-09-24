interface EstablishmentProps {
  name: string;
  alias: string;
  description: string;
  imageUrl: string;
}

interface Props {
  _id: string;
  followedById: string;
  followedToId: string;
  establishment: EstablishmentProps;
}

export class FollowUserEstablishmentDTO {
  constructor(props: Props) {
    Object.assign(this, props);
  }

  public readonly _id: string;

  public readonly followedById: string;

  public readonly followedToId: string;

  public readonly establishment: EstablishmentProps;
}
