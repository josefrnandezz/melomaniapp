import { IdAlreadyRegisteredError } from '@aulasoftwarelibre/nestjs-eventstore';
import { CreateGenreDTO, GenreDTO } from '@melomaniapp/contracts/genre';
import { catchError } from '@melomaniapp/nestjs/common';
import {
  Body,
  ConflictException,
  Controller,
  Get,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import { GenreService } from '../services';

@Controller('genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Post()
  async create(@Body() genreDTO: CreateGenreDTO): Promise<GenreDTO> {
    try {
      return this.genreService.create(genreDTO);
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
}
