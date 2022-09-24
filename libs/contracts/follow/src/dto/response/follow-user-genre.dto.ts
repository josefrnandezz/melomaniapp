interface GenreProps {
  name: string;
}

interface Props {
  _id: string;
  followedById: string;
  followedToId: string;
  genre: GenreProps;
}

export class FollowUserGenreDTO {
  constructor(props: Props) {
    Object.assign(this, props);
  }

  public readonly _id: string;

  public readonly followedById: string;

  public readonly followedToId: string;

  public readonly genre: GenreProps;
}
