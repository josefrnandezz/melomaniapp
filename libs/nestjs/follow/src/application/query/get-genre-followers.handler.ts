import { FollowDTO } from '@melomaniapp/contracts/follow';
import { GenreId } from '@melomaniapp/nestjs/genre';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FOLLOW_FINDER, IFollowFinder } from '../services';
import { GetGenreFollowersQuery } from './get-genre-followers.query';

@QueryHandler(GetGenreFollowersQuery)
export class GetGenreFollowersHandler
  implements IQueryHandler<GetGenreFollowersQuery>
{
  constructor(
    @Inject(FOLLOW_FINDER)
    private readonly followFinder: IFollowFinder
  ) {}
  async execute(query: GetGenreFollowersQuery): Promise<FollowDTO[]> {
    return await this.followFinder.findFollowersByGenre(
      GenreId.fromString(query.genreId)
    );
  }
}
