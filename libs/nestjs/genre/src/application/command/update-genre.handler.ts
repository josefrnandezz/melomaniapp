import {
  AggregateRepository,
  IdNotFoundError,
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
import { UpdateGenreCommand } from './update-genre.command';

@CommandHandler(UpdateGenreCommand)
export class UpdateGenreHandler implements ICommandHandler<UpdateGenreCommand> {
  constructor(
    @InjectAggregateRepository(Genre)
    public readonly genres: AggregateRepository<Genre, GenreId>,
    @Inject(GENRE_FINDER)
    public readonly finder: IGenreFinder
  ) {}

  async execute(command: UpdateGenreCommand) {
    const genreId = GenreId.fromString(command.genreId);
    const genreName = GenreName.fromString(command.genreName);

    const genre = await this.genres.find(genreId);

    if (!genre || genre.deleted) {
      throw IdNotFoundError.withId(genreId);
    }

    if (await this.finder.findOneByName(genreName)) {
      throw GenreNameAlreadyTakenError.with(genreName);
    }

    await this.updateName(genre, command);

    this.genres.save(genre);
  }

  private async updateName(genre: Genre, command: UpdateGenreCommand) {
    if (!command.genreName) {
      return;
    }

    genre.updateName(GenreName.fromString(command.genreName));
  }
}
