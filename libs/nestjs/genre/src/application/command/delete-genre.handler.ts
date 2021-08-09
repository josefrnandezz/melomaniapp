import {
  AggregateRepository,
  IdNotFoundError,
  InjectAggregateRepository,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Genre, GenreId } from '../../domain';
import { DeleteGenreCommand } from './delete-genre.command';

@CommandHandler(DeleteGenreCommand)
export class DeleteGenreHandler implements ICommandHandler<DeleteGenreCommand> {
  constructor(
    @InjectAggregateRepository(Genre)
    public readonly genres: AggregateRepository<Genre, GenreId>
  ) {}

  async execute(command: DeleteGenreCommand) {
    const genreId = GenreId.fromString(command.genreId);

    const genre = await this.genres.find(genreId);

    if (!genre || genre.deleted) {
      throw IdNotFoundError.withId(genreId);
    }

    genre.delete();

    await this.genres.delete(genre);
  }
}
