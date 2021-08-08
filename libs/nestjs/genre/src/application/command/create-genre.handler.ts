import {
  AggregateRepository,
  IdAlreadyRegisteredError,
  InjectAggregateRepository,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  Genre,
  GenreId,
  GenreName,
  GenreNameAlreadyTakenError,
} from '../../domain';
import { GENRE_FINDER, IGenreFinder } from '../services';
import { CreateGenreCommand } from './create-genre.command';

@CommandHandler(CreateGenreCommand)
export class CreateGenreHandler implements ICommandHandler<CreateGenreCommand> {
  constructor(
    @InjectAggregateRepository(Genre)
    public readonly genres: AggregateRepository<Genre, GenreId>,
    @Inject(GENRE_FINDER)
    private readonly finder: IGenreFinder
  ) {}

  async execute(command: CreateGenreCommand) {
    const genreId = GenreId.fromString(command.genreId);
    const genreName = GenreName.fromString(command.name);

    if ((await this.genres.find(genreId)) instanceof Genre) {
      throw IdAlreadyRegisteredError.withId(genreId);
    }

    if (await this.finder.findOneByName(genreName)) {
      throw GenreNameAlreadyTakenError.with(genreName);
    }

    const genre = Genre.add(genreId, genreName);

    await this.genres.save(genre);
  }
}
