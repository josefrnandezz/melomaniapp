interface ArtistProps {
  name: string;
  alias: string;
  description: string;
}

interface Props {
  _id: string;
  followedById: string;
  followedToId: string;
  artist: ArtistProps;
}

export class FollowUserArtistDTO {
  constructor(props: Props) {
    Object.assign(this, props);
  }

  public readonly _id: string;

  public readonly followedById: string;

  public readonly followedToId: string;

  public readonly artist: ArtistProps;
}
