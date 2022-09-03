import { IQuery } from '@nestjs/cqrs';

export class GetArtistFollowersQuery implements IQuery {
  constructor(public readonly artistId: string) {}
}
