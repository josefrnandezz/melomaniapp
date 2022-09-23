import {
  CreateEventDTO,
  EditEventDTO,
  EventDTO,
  FullEventDTO,
} from '@melomaniapp/contracts/event';
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import {
  CancelEventCommand,
  CreateEventCommand,
  GetEventQuery,
  UpdateEventCommand,
} from '../../application';

@Injectable()
export class EventService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async create(userId: string, event: CreateEventDTO): Promise<EventDTO> {
    const {
      _id,
      name,
      description,
      startsAt,
      endsAt,
      address,
      artistIds,
      establishmentId,
      genreIds,
    } = event;

    await this.commandBus.execute(
      new CreateEventCommand(
        _id,
        userId,
        name,
        description,
        startsAt,
        endsAt,
        address,
        artistIds,
        establishmentId,
        genreIds
      )
    );

    return new EventDTO({ userId, ...event });
  }

  async findOne(eventId: string): Promise<FullEventDTO> {
    return await this.queryBus.execute(new GetEventQuery(eventId));
  }

  async update(id: string, event: EditEventDTO): Promise<EventDTO> {
    const { name, description, startsAt, endsAt, artistIds, genreIds } = event;

    await this.commandBus.execute(
      new UpdateEventCommand(
        id,
        name,
        description,
        startsAt,
        endsAt,
        artistIds,
        genreIds
      )
    );

    const updatedEvent = await this.queryBus.execute(new GetEventQuery(id));

    return new EventDTO({ ...updatedEvent });
  }

  async cancel(id: string): Promise<void> {
    return await this.commandBus.execute(new CancelEventCommand(id));
  }
}
