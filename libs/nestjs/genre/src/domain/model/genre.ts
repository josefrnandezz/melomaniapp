import { AggregateRoot } from '@aulasoftwarelibre/nestjs-eventstore';

import { GenreWasCreated } from '../event';
import { GenreId } from './genre-id';
import { GenreName } from './genre-name';

export class Genre extends AggregateRoot {
  private _genreId: GenreId;
  private _genreName: GenreName;
  private _deleted?: Date;

  public static add(genreId: GenreId, genreName: GenreName): Genre {
    const genre = new Genre();

    genre.apply(new GenreWasCreated(genreId.value, genreName.value));

    return genre;
  }

  aggregateId(): string {
    return this._genreId.value;
  }

  private onGenreWasCreated(event: GenreWasCreated) {
    this._genreId = GenreId.fromString(event.id);
    this._genreName = GenreName.fromString(event.name);
    this._deleted = null;
  }
}
