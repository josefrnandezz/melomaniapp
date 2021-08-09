import {
  CreateGenreDTO,
  EditGenreDTO,
  GenreDTO,
} from '@melomaniapp/contracts/genre';
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import {
  CreateGenreCommand,
  DeleteGenreCommand,
  GetGenreQuery,
  GetGenresQuery,
  UpdateGenreCommand,
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
    return await this.queryBus.execute(new GetGenreQuery(id));
  }

  async findAll(): Promise<GenreDTO[]> {
    return await this.queryBus.execute(new GetGenresQuery());
  }

  async update(id: string, editGenreDTO: EditGenreDTO): Promise<GenreDTO> {
    await this.commandBus.execute(
      new UpdateGenreCommand(id, editGenreDTO.name)
    );

    const genre = await this.queryBus.execute(new GetGenreQuery(id));

    return new GenreDTO({ ...genre });
  }

  async delete(id: string) {
    await this.commandBus.execute(new DeleteGenreCommand(id));
  }
}
