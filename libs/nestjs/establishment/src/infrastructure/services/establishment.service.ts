import {
  CreateEstablishmentDTO,
  EstablishmentDTO,
} from '@melomaniapp/contracts/establishment';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { CreateEstablishmentCommand } from '../../application/command/create-establishment.command';

@Injectable()
export class EstablishmentService {
  constructor(private readonly commandBus: CommandBus) {}

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

    console.debug({ ownerId, ...establishmentDTO });

    return new EstablishmentDTO({ ownerId, ...establishmentDTO });
  }
}
