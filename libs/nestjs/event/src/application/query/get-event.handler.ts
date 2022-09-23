import { IdNotFoundError } from '@aulasoftwarelibre/nestjs-eventstore';
import { FullEventDTO } from '@melomaniapp/contracts/event';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { EventId } from '../../domain';
import { EVENT_FINDER, IEventFinder } from '../services';
import { GetEventQuery } from './get-event.query';

@QueryHandler(GetEventQuery)
export class GetEventHandler implements IQueryHandler<GetEventQuery> {
  constructor(
    @Inject(EVENT_FINDER)
    private readonly finder: IEventFinder
  ) {}

  async execute(query: GetEventQuery): Promise<FullEventDTO> {
    const id = EventId.fromString(query.id);

    const event = await this.finder.find(id);

    if (!event) {
      throw IdNotFoundError.withId(id);
    }

    return event;
  }
}
