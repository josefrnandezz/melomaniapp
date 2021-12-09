import {
  IdAlreadyRegisteredError,
  IdNotFoundError,
} from '@aulasoftwarelibre/nestjs-eventstore';
import {
  CreateEstablishmentDTO,
  EditEstablishmentDTO,
  EstablishmentDTO,
} from '@melomaniapp/contracts/establishment';
import { UserDto } from '@melomaniapp/contracts/user';
import { catchError, Role, Roles, User } from '@melomaniapp/nestjs/common';
import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Response } from 'express';

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

  @Get()
  async findAll(
    @Res({ passthrough: true }) res: Response
  ): Promise<EstablishmentDTO[]> {
    try {
      const establishments = await this.establishmentService.findAll();
      const length = establishments.length;

      res.setHeader('X-Total-Count', length);

      return establishments;
    } catch (e) {
      throw catchError(e);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<EstablishmentDTO> {
    try {
      return await this.establishmentService.findOne(id);
    } catch (error) {
      if (error instanceof IdNotFoundError) {
        throw new NotFoundException('Establishment not found');
      } else {
        throw catchError(error);
      }
    }
  }

  @Put(':id')
  @Roles(Role.Admin)
  @HttpCode(204)
  async update(
    @Param('id') id: string,
    @Body() establishment: EditEstablishmentDTO
  ): Promise<EstablishmentDTO> {
    try {
      return await this.establishmentService.update(id, establishment);
    } catch (error) {
      if (error instanceof IdNotFoundError) {
        throw catchError(error);
      }
    }
  }
}
