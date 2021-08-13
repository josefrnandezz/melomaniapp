import { IdAlreadyRegisteredError } from '@aulasoftwarelibre/nestjs-eventstore';
import {
  CreateEstablishmentDTO,
  EstablishmentDTO,
} from '@melomaniapp/contracts/establishment';
import { catchError } from '@melomaniapp/nestjs/common';
import {
  Body,
  ConflictException,
  Controller,
  Param,
  Post,
} from '@nestjs/common';

import { EstablishmentService } from '../services';

@Controller('establishments')
export class EstablishmentController {
  constructor(public readonly establishmentService: EstablishmentService) {}

  @Post()
  async create(
    @Param('ownerId') ownerId: string,
    @Body() establishmentDTO: CreateEstablishmentDTO
  ): Promise<EstablishmentDTO> {
    try {
      return await this.establishmentService.create(ownerId, establishmentDTO);
    } catch (e) {
      if (e instanceof IdAlreadyRegisteredError) {
        throw new ConflictException(e.message);
      } else {
        throw catchError(e);
      }
    }
  }
}
