import { CreateGenreDTO, GenreDTO } from '@melomaniapp/contracts/genre';
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import {
  CreateGenreCommand,
  GetGenreQuery,
  GetGenresQuery,
} from '../../application';

@Injectable()
export class GenreService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async create(genreDTO: CreateGenreDTO): Promise<GenreDTO> {
    const { _id, name } = genreDTO;

    await this.commandBus.execute(new CreateGenreCommand(_id, name));

    return new GenreDTO({ ...genreDTO });
  }

  async findOne(id: string): Promise<GenreDTO> {
    return this.queryBus.execute(new GetGenreQuery(id));
  }

  async findAll(): Promise<GenreDTO[]> {
    return this.queryBus.execute(new GetGenresQuery());
  }
}
