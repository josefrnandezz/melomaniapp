import { EventDTO } from '@melomaniapp/contracts/event';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { EstablishmentId } from '../../domain';
import { EVENT_FINDER, IEventFinder } from '../services';
import { GetEventsByEstablishmentQuery } from './get-events-by-establishment.query';

@QueryHandler(GetEventsByEstablishmentQuery)
export class GetEventsByEstablishmentHandler
  implements IQueryHandler<GetEventsByEstablishmentQuery>
{
  constructor(
    @Inject(EVENT_FINDER)
    private readonly finder: IEventFinder
  ) {}

  async execute(query: GetEventsByEstablishmentQuery): Promise<EventDTO[]> {
    const id = EstablishmentId.fromString(query.establishmentId);

    return await this.finder.findByEstablishment(id);
  }
}
