import { FollowDTO } from '@melomaniapp/contracts/follow';
import { GenreId } from '@melomaniapp/nestjs/genre';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FOLLOW_FINDER, IFollowFinder } from '../services';
import { GetUserFollowsQuery } from './get-user-follows.query';

@QueryHandler(GetUserFollowsQuery)
export class GetUserFollowsHandler
  implements IQueryHandler<GetUserFollowsQuery>
{
  constructor(
    @Inject(FOLLOW_FINDER)
    private readonly followFinder: IFollowFinder
  ) {}
  async execute(query: GetUserFollowsQuery): Promise<FollowDTO[]> {
    return await this.followFinder.findFollows(
      GenreId.fromString(query.userId),
      query.type
    );
  }
}
