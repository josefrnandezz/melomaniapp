import {
  AggregateRepository,
  IdAlreadyRegisteredError,
  InjectAggregateRepository,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { EventDTO } from '@melomaniapp/contracts/event';
import { Address, Description } from '@melomaniapp/nestjs/common';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  ArtistId,
  EstablishmentId,
  Event,
  EventId,
  EventName,
  GenreId,
  UserId,
} from '../../domain';
import { IEventFinder } from '../services';
import { CreateEventCommand } from './create-event.command';

@CommandHandler(CreateEventCommand)
export class CreateEventHandler implements ICommandHandler<CreateEventCommand> {
  constructor(
    @InjectAggregateRepository(Event)
    private readonly repository: AggregateRepository<Event, EventId>,
    @Inject()
    private readonly finder: IEventFinder
  ) {}

  async execute(command: CreateEventCommand): Promise<void> {
    const id = EventId.fromString(command.id);

    if ((await this.finder.find(id)) instanceof EventDTO) {
      throw IdAlreadyRegisteredError.withId(id);
    }

    const event = Event.add({
      id,
      userId: UserId.fromString(command.userId),
      name: EventName.fromString(command.name),
      description: Description.fromString(command.description),
      startsAt: command.startsAt,
      endsAt: command.endsAt,
      establishment: EstablishmentId.fromString(command.establishmentId),
      address: Address.with(command.address.full, command.address.city),
    });

    command.artistIds.map((id) => event.addArtist(ArtistId.fromString(id)));
    command.genreIds.map((id) => event.addGenre(GenreId.fromString(id)));

    this.repository.save(event);
  }
}
