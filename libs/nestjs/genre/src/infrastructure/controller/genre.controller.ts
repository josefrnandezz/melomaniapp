import {
  IdAlreadyRegisteredError,
  IdNotFoundError,
} from '@aulasoftwarelibre/nestjs-eventstore';
import {
  CreateGenreDTO,
  EditGenreDTO,
  GenreDTO,
} from '@melomaniapp/contracts/genre';
import { catchError } from '@melomaniapp/nestjs/common';
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
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';

import { GenreService } from '../services';

@Controller('genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Post()
  async create(@Body() genreDTO: CreateGenreDTO): Promise<GenreDTO> {
    try {
      return await this.genreService.create(genreDTO);
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
  ): Promise<GenreDTO[]> {
    try {
      const genres = await this.genreService.findAll();
      const length = genres.length;

      res.setHeader('X-Total-Count', length);

      return genres;
    } catch (e) {
      throw catchError(e);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<GenreDTO> {
    try {
      return await this.genreService.findOne(id);
    } catch (e) {
      if (e instanceof IdNotFoundError) {
        throw new NotFoundException('Genre not found');
      } else {
        throw catchError(e);
      }
    }
  }

  @Put(':id')
  @HttpCode(204)
  async update(
    @Param('id') id: string,
    @Body() editGenreDTO: EditGenreDTO
  ): Promise<void> {
    try {
      await this.genreService.update(id, editGenreDTO);
    } catch (e) {
      if (e instanceof IdNotFoundError) {
        throw new NotFoundException('Genre not found');
      } else {
        throw catchError(e);
      }
    }
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Delete genre' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    try {
      return await this.genreService.delete(id);
    } catch (e) {
      if (e instanceof IdNotFoundError) {
        throw new NotFoundException('Genre not found');
      } else {
        throw catchError(e);
      }
    }
  }
}
