import {
  AggregateRepository,
  IdAlreadyRegisteredError,
  InjectAggregateRepository,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Genre, GenreId, GenreName } from '../../domain';
import { CreateGenreCommand } from './create-genre.command';

@CommandHandler(CreateGenreCommand)
export class CreateGenreHandler implements ICommandHandler<CreateGenreCommand> {
  constructor(
    @InjectAggregateRepository(Genre)
    public readonly genres: AggregateRepository<Genre, GenreId>
  ) {}

  async execute(command: CreateGenreCommand) {
    const genreId = GenreId.fromString(command.genreDTO._id);
    const genreName = GenreName.fromString(command.genreDTO.name);

    if ((await this.genres.find(genreId)) instanceof Genre) {
      throw IdAlreadyRegisteredError.withId(genreId);
    }

    const genre = Genre.add(genreId, genreName);

    await this.genres.save(genre);
  }
}
