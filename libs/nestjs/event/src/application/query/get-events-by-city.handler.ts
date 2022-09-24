import { EventDTO } from '@melomaniapp/contracts/event';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { EVENT_FINDER, IEventFinder } from '../services';
import { GetEventsByCityQuery } from './get-events-by-city.query';

@QueryHandler(GetEventsByCityQuery)
export class GetEventsByCityHandler
  implements IQueryHandler<GetEventsByCityQuery>
{
  constructor(
    @Inject(EVENT_FINDER)
    private readonly finder: IEventFinder
  ) {}

  async execute(query: GetEventsByCityQuery): Promise<EventDTO[]> {
    const events = await this.finder.findByCity(query.city);

    return events;
  }
}
