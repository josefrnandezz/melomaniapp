import { ApiProperty } from '@nestjs/swagger';

export class UnfollowDTO {
  @ApiProperty()
  public readonly _id: string;

  @ApiProperty()
  public readonly unfollowedToId: string;

  @ApiProperty()
  public readonly unfollowedById: string;
}
