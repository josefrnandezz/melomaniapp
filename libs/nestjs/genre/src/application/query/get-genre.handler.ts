import { IdNotFoundError } from '@aulasoftwarelibre/nestjs-eventstore';
import { GenreDTO } from '@melomaniapp/contracts/genre';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GenreId } from '../../domain';
import { GENRE_FINDER, IGenreFinder } from '../services';
import { GetGenreQuery } from './get-genre.query';

@QueryHandler(GetGenreQuery)
export class GetGenreHandler implements IQueryHandler<GetGenreQuery> {
  constructor(
    @Inject(GENRE_FINDER)
    private readonly finder: IGenreFinder
  ) {}

  async execute(query: GetGenreQuery): Promise<GenreDTO> {
    const genreId = GenreId.fromString(query.id);

    const genre = await this.finder.find(genreId);

    if (!genre) {
      throw IdNotFoundError.withId(genreId);
    }

    return genre;
  }
}
