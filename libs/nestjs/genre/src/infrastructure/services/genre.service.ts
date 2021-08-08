import { CreateGenreDTO, GenreDTO } from '@melomaniapp/contracts/genre';
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateGenreCommand, GetGenresQuery } from '../../application';

@Injectable()
export class GenreService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async create(genreDTO: CreateGenreDTO): Promise<GenreDTO> {
    await this.commandBus.execute(new CreateGenreCommand(genreDTO));

    return new GenreDTO({ ...genreDTO });
  }

  async findAll(): Promise<GenreDTO[]> {
    return this.queryBus.execute(new GetGenresQuery());
  }
}
