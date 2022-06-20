import { IdAlreadyRegisteredError } from '@aulasoftwarelibre/nestjs-eventstore';
import {
  ArtistDTO,
  CreateArtistDTO,
  EditArtistDTO,
} from '@melomaniapp/contracts/artist';
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
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ACGuard, UseRoles } from 'nest-access-control';

import { ArtistGuard } from '../auth';
import { ArtistService } from '../services';

@ApiBearerAuth()
@Controller('artists')
export class ArtistController {
  constructor(public readonly artistService: ArtistService) {}

  @Post()
  @UseRoles({
    resource: Resource.Establishment,
    action: 'create',
    possession: 'any',
  })
  @UseGuards(ArtistGuard, ACGuard)
  async create(
    @User() user: UserDto,
    @Body() artistDTO: CreateArtistDTO
  ): Promise<ArtistDTO> {
    try {
      return await this.artistService.create(user._id, artistDTO);
    } catch (e) {
      if (e instanceof IdAlreadyRegisteredError) {
        throw new ConflictException(e.message);
      } else {
        throw catchError(e);
      }
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ArtistDTO> {
    try {
      return await this.artistService.findOne(id);
    } catch (e) {
      if (e instanceof IdAlreadyRegisteredError) {
        throw new NotFoundException('Artist not found');
      } else {
        throw catchError(e);
      }
    }
  }

  @Get()
  async find(): Promise<ArtistDTO> {
    try {
      return await this.artistService.findAll();
    } catch (e) {
      if (e instanceof IdAlreadyRegisteredError) {
        throw new NotFoundException('Artist not found');
      } else {
        throw catchError(e);
      }
    }
  }

  @Put(':id')
  @HttpCode(204)
  async update(@Param('id') id: string, @Body() artistDTO: EditArtistDTO) {
    try {
      await this.artistService.update(id, artistDTO);
    } catch (e) {
      throw catchError(e);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    try {
      return await this.artistService.delete(id);
    } catch (e) {
      throw catchError(e);
    }
  }
}
