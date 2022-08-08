import { FollowDTO } from '@melomaniapp/contracts/follow';
import { EventId } from '@melomaniapp/nestjs/event';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FOLLOW_FINDER, IFollowFinder } from '../services';
import { GetEventFollowersQuery } from './get-event-followers.query';

@QueryHandler(GetEventFollowersQuery)
export class GetEventFollowersHandler
  implements IQueryHandler<GetEventFollowersQuery>
{
  constructor(
    @Inject(FOLLOW_FINDER)
    private readonly followFinder: IFollowFinder
  ) {}
  async execute(query: GetEventFollowersQuery): Promise<FollowDTO[]> {
    return await this.followFinder.findFollowersByEvent(
      EventId.fromString(query.eventId)
    );
  }
}
