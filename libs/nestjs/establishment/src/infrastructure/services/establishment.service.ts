import {
  CreateEstablishmentDTO,
  EditEstablishmentDTO,
  EstablishmentDTO,
} from '@melomaniapp/contracts/establishment';
import { EventDTO } from '@melomaniapp/contracts/event';
import { GetEventsByEstablishmentQuery } from '@melomaniapp/nestjs/event';

import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import {
  CreateEstablishmentCommand,
  DeleteEstablishmentCommand,
  GetEstablishmentQuery,
  GetEstablishmentsQuery,
  UpdateEstablishmentCommand,
} from '../../application';

@Injectable()
export class EstablishmentService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async create(
    ownerId: string,
    establishmentDTO: CreateEstablishmentDTO
  ): Promise<EstablishmentDTO> {
    const { _id, name, alias, description, email, address, genreIds } =
      establishmentDTO;

    await this.commandBus.execute(
      new CreateEstablishmentCommand(
        _id,
        ownerId,
        name,
        alias,
        description,
        email,
        address,
        genreIds
      )
    );

    return new EstablishmentDTO({ ownerId, ...establishmentDTO });
  }

  async findAll(): Promise<EstablishmentDTO[]> {
    return await this.queryBus.execute(new GetEstablishmentsQuery());
  }

  async findOne(id: string): Promise<EstablishmentDTO> {
    return await this.queryBus.execute(new GetEstablishmentQuery(id));
  }

  async update(
    id: string,
    establishment: EditEstablishmentDTO
  ): Promise<EstablishmentDTO> {
    this.commandBus.execute(
      new UpdateEstablishmentCommand(
        id,
        establishment.name,
        establishment.alias,
        establishment.description,
        establishment.email,
        establishment.address,
        establishment.genreIds
      )
    );

    const updatedEstablishment = await this.findOne(id);
    return updatedEstablishment;
  }

  async delete(id: string): Promise<void> {
    return await this.commandBus.execute(new DeleteEstablishmentCommand(id));
  }

  async findEventsByEstablishment(
    establishmentId: string
  ): Promise<EventDTO[]> {
    return await this.queryBus.execute(
      new GetEventsByEstablishmentQuery(establishmentId)
    );
  }
}
