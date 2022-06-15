import { AggregateRoot } from '@aulasoftwarelibre/nestjs-eventstore';
import { ArtistId } from './artist-id';
import { ArtistName } from './name';
import { Alias, Description } from '@melomaniapp/nestjs/common';
import { GenreId } from './genre-id';
import { SocialLink } from './social-link';

export class Artist extends AggregateRoot {
  private readonly _id: ArtistId;
  private readonly _name: ArtistName;
  private readonly _alias: Alias;
  private readonly _description: Description;
  private readonly _socialLinks: SocialLink[];
  private readonly _genreIds: GenreId[];
  private readonly _deleted?: Date;

  get id(): ArtistId {
    return this._id;
  }

  get name(): ArtistName {
    return this._name;
  }

  get alias(): Alias {
    return this._alias;
  }

  get description(): Description {
    return this._description;
  }

  get socialLinks(): SocialLink[] {
    return this._socialLinks;
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
