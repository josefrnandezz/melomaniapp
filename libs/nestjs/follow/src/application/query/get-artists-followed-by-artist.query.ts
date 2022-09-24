import { FollowType } from '@melomaniapp/contracts/follow';
import { IQuery } from '@nestjs/cqrs';

export class GetArtistsFollowedByArtistQuery implements IQuery {
  constructor(
    public readonly artistId: string,
    public readonly type: FollowType
  ) {}
}
