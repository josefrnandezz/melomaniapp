interface ArtistProps {
  _id: string;
  name: string;
  alias: string;
  description: string;
  imageUrl: string;
}

interface Props {
  _id: string;
  followedBy: ArtistProps;
  followedTo: ArtistProps;
}

export class FollowArtistArtistDTO {
  constructor(props: Props) {
    Object.assign(this, props);
  }

  public readonly _id: string;

  public readonly followedBy: ArtistProps;

  public readonly followedTo: ArtistProps;
}
