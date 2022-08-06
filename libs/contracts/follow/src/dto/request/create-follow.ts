import { ApiProperty } from '@nestjs/swagger';
import { FollowType } from '../response';

export class CreateFollowDTO {
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
