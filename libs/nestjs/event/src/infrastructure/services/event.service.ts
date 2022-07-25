import { CreateEventDTO, EventDTO } from '@melomaniapp/contracts/event';
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateEventCommand } from '../../application';

@Injectable()
export class EventService {
  constructor(private readonly commandBus: CommandBus) {}

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
}
