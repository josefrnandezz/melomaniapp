import { CommandBus, QueryBus } from '@nestjs/cqrs';

export * from './event.service';

export class EventService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  create(): EventDto {}
}
