import {
  AggregateRepository,
  IdNotFoundError,
  InjectAggregateRepository,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Event, EventId } from '../../domain';
import { CancelEventCommand } from './cancel-event.command';

@CommandHandler(CancelEventCommand)
export class CancelEventHandler implements ICommandHandler<CancelEventCommand> {
  constructor(
    @InjectAggregateRepository(Event)
    private readonly repository: AggregateRepository<Event, EventId>
  ) {}

  async execute(command: CancelEventCommand): Promise<void> {
    const id = EventId.fromString(command.id);
    const event = await this.repository.find(id);

    if (!event) {
      throw IdNotFoundError.withId(id);
    }

    event.cancel();

    this.repository.save(event);
  }
}
