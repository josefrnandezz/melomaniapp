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
  followedToId: string;
  followedToType: FollowType;
  followedFromId: string;
  followedFromType: FollowType;
}

export class FollowDTO {
  constructor(props: Props) {
    Object.assign(this, props);
  }

  @ApiProperty()
  public readonly _id: string;

  @ApiProperty()
  public readonly followedToId: string;

  @ApiProperty()
  public readonly followedToType: FollowType;

  @ApiProperty()
  public readonly followedFromId: string;

  @ApiProperty()
  public readonly followedFromType: FollowType;
}
