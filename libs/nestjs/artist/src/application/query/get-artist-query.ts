import { IQuery } from '@nestjs/cqrs';

export class GetArtistQuery implements IQuery {
  constructor(public readonly id: string) {}
}
