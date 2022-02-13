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
import { catchError, Resource, User } from '@melomaniapp/nestjs/common';
import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { ACGuard, UseRoles } from 'nest-access-control';

import { EstablishmentGuard } from '../auth/establishment.guard';
import { EstablishmentService } from '../services';

@ApiBearerAuth()
@Controller('establishments')
export class EstablishmentController {
  constructor(public readonly establishmentService: EstablishmentService) {}

  @Post()
  @UseRoles({
    resource: Resource.Establishment,
    action: 'create',
    possession: 'any',
  })
  @UseGuards(EstablishmentGuard, ACGuard)
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
  @HttpCode(204)
  @UseRoles({
    resource: Resource.Establishment,
    action: 'update',
    possession: 'own',
  })
  @UseGuards(EstablishmentGuard, ACGuard)
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

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Delete genre' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @HttpCode(204)
  @UseRoles({
    resource: Resource.Establishment,
    action: 'delete',
    possession: 'own',
  })
  @UseGuards(EstablishmentGuard, ACGuard)
  async delete(@Param('id') id: string): Promise<void> {
    try {
      return await this.establishmentService.delete(id);
    } catch (error) {
      if (error instanceof IdNotFoundError) {
        throw new NotFoundException('Establishment not found');
      } else {
        throw catchError(error);
      }
    }
  }
}
