import { ApiProperty } from '@nestjs/swagger';

export class CreateFollowDTO {
  @ApiProperty()
  public readonly _id: string;

  @ApiProperty()
  public readonly followedToId: string;

  @ApiProperty()
  public readonly followedById: string;
}
