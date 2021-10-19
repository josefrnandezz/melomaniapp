import {
  CreateEstablishmentDTO,
  EstablishmentDTO,
} from '@melomaniapp/contracts/establishment';
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import {
  CreateEstablishmentCommand,
  GetEstablishmentQuery,
  GetEstablishmentsQuery,
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
    const { _id, name, slug, description, email, address, genreIds } =
      establishmentDTO;

    await this.commandBus.execute(
      new CreateEstablishmentCommand(
        _id,
        ownerId,
        name,
        slug,
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
}
