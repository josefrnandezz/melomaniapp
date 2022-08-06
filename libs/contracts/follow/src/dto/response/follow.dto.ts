import { ApiProperty } from '@nestjs/swagger';

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

  @ApiProperty()
  public readonly _id: string;

  @ApiProperty()
  public readonly followedById: string;

  @ApiProperty()
  public readonly followedByType: FollowType;

  @ApiProperty()
  public readonly followedToId: string;

  @ApiProperty()
  public readonly followedToType: FollowType;
}
