import { IQuery } from '@nestjs/cqrs';

export class GetArtistFromUserQuery implements IQuery {
  public constructor(public readonly userId: string) {}
}
