import { IQuery } from '@nestjs/cqrs';

export class GetArtistFollowersQuery implements IQuery {
  public constructor(public readonly artistId: string) {}
}
