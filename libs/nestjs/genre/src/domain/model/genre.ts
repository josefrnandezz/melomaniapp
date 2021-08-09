import { AggregateRoot } from '@aulasoftwarelibre/nestjs-eventstore';

import { GenreNameWasUpdated, GenreWasCreated } from '../event';
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

  get id(): GenreId {
    return this._genreId;
  }

  get name(): GenreName {
    return this._genreName;
  }

  get deleted(): boolean {
    return !!this._deleted;
  }

  updateName(genreName: GenreName): void {
    if (this._genreName.equals(genreName)) {
      return;
    }

    this.apply(new GenreNameWasUpdated(this.id.value, genreName.value));
  }

  private onGenreWasCreated(event: GenreWasCreated) {
    this._genreId = GenreId.fromString(event.id);
    this._genreName = GenreName.fromString(event.name);
    this._deleted = null;
  }

  private onGenreNameWasUpdated(event: GenreNameWasUpdated) {
    this._genreName = GenreName.fromString(event.name);
  }
}
