import { IdAlreadyRegisteredError } from '@aulasoftwarelibre/nestjs-eventstore';
import { CreateEstablishmentDTO } from '@melomaniapp/contracts/establishment';
import { catchError } from '@melomaniapp/nestjs/common';
import {
  Body,
  ConflictException,
  Controller,
  Param,
  Post,
} from '@nestjs/common';

import { EstablishmentService } from '../services';

@Controller('establishment')
export class EstablishmentController {
  constructor(public readonly establishmentService: EstablishmentService) {}

  @Post()
  async create(
    @Body() establishmentDTO: CreateEstablishmentDTO,
    @Param() ownerId: string
  ) {
    try {
      return await this.establishmentService.create(establishmentDTO, ownerId);
    } catch (e) {
      if (e instanceof IdAlreadyRegisteredError) {
        throw new ConflictException(e.message);
      } else {
        throw catchError(e);
      }
    }
  }
}
