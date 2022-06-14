import { AggregateRoot } from '@aulasoftwarelibre/nestjs-eventstore';
import { ArtistId } from './artist-id';
import { ArtistName } from './name';
import { Description } from '@melomaniapp/nestjs/common';
import { GenreId } from './genre-id';

export class Artist extends AggregateRoot {
  private readonly _id: ArtistId;
  private readonly _name: ArtistName;
  private readonly _description: Description;
  private readonly _socialLinks: string[];
  private readonly _genreIds: GenreId[];
  private readonly _deleted?: Date;

  get id(): ArtistId {
    return this._id;
  }

  get name(): ArtistName {
    return this._name;
  }

  get genres(): GenreId[] {
    return this._genreIds;
  }

  get deleted(): boolean {
    return !!this._deleted;
  }

  aggregateId(): string {
    return this._id.value;
  }
}
