import { IdAlreadyRegisteredError } from '@aulasoftwarelibre/nestjs-eventstore';
import {
  CreateEstablishmentDTO,
  EstablishmentDTO,
} from '@melomaniapp/contracts/establishment';
import { UserDto } from '@melomaniapp/contracts/user';
import { catchError, Role, Roles, User } from '@melomaniapp/nestjs/common';
import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { EstablishmentService } from '../services';

@ApiBearerAuth()
@Controller('establishments')
export class EstablishmentController {
  constructor(public readonly establishmentService: EstablishmentService) {}

  @Post()
  @Roles(Role.Admin)
  async create(
    @User() user: UserDto,
    @Body() establishmentDTO: CreateEstablishmentDTO
  ): Promise<EstablishmentDTO> {
    try {
      return await this.establishmentService.create(user._id, establishmentDTO);
    } catch (e) {
      if (e instanceof IdAlreadyRegisteredError) {
        throw new ConflictException(e.message);
      } else {
        throw catchError(e);
      }
    }
  }
}
