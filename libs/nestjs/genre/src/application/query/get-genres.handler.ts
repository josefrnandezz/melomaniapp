import { GenreDTO } from '@melomaniapp/contracts/genre';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GENRE_FINDER, IGenreFinder } from '../services';
import { GetGenresQuery } from './get-genres.query';

@QueryHandler(GetGenresQuery)
export class GetGenresHandler implements IQueryHandler<GetGenresQuery> {
  constructor(
    @Inject(GENRE_FINDER)
    private readonly finder: IGenreFinder
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(query: GetGenresQuery): Promise<GenreDTO[]> {
    return this.finder.findAll();
  }
}
