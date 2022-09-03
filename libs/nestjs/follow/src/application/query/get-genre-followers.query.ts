import { IQuery } from '@nestjs/cqrs';

export class GetGenreFollowersQuery implements IQuery {
  constructor(public readonly genreId: string) {}
}
