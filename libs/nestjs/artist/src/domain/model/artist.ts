import { AggregateRoot } from '@aulasoftwarelibre/nestjs-eventstore';
import { ArtistId } from './artist-id';
import { ArtistName } from './name';
import { Alias, Description } from '@melomaniapp/nestjs/common';
import { GenreId } from './genre-id';
import { SocialLink } from './social-link';
import { UserId } from './user-id';
import {
  ArtistGenreWasAdded,
  ArtistGenreWasRemoved,
  ArtistWasCreated,
} from '../event';

export class Artist extends AggregateRoot {
  private _id: ArtistId;
  private _userId: UserId;
  private _name: ArtistName;
  private _alias: Alias;
  private _description: Description;
  private _socialLinks: SocialLink[];
  private _genreIds: GenreId[];
  private _deleted?: Date;

  get id(): ArtistId {
    return this._id;
  }

  get userId(): UserId {
    return this._userId;
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

  static create(args: {
    id: ArtistId;
    userId: UserId;
    name: ArtistName;
    alias: Alias;
    description: Description;
    socialLinks: SocialLink[];
    genres: GenreId[];
  }): Artist {
    const artist = new Artist();

    const socialLinks = args.socialLinks.map((link) => link.value);

    artist.apply(
      new ArtistWasCreated(
        args.id.value,
        args.userId.value,
        args.name.value,
        args.alias.value,
        args.description.value,
        socialLinks
      )
    );

    return artist;
  }

  hasGenre(genreId: GenreId): boolean {
    return this._genreIds.some((item: GenreId) => item.equals(genreId));
  }

  addGenre(genre: GenreId): void {
    if (this.hasGenre(genre)) {
      return;
    }

    this.apply(new ArtistGenreWasAdded(this._id.value, genre.value));
  }

  removeGenre(genre: GenreId): void {
    if (!this.hasGenre(genre)) {
      return;
    }

    this.apply(new ArtistGenreWasRemoved(this._id.value, genre.value));
  }

  private onArtistWasCreated(event: ArtistWasCreated): void {
    this._userId = UserId.fromString(event.userId);
    this._name = ArtistName.fromString(event.name);
    this._alias = Alias.fromString(event.alias);
    this._description = Description.fromString(event.name);
    this._socialLinks = event.socialLinks.map((link) =>
      SocialLink.fromString(link)
    );
    this._genreIds = [];
    this._deleted = null;
  }

  private onArtistGenreWasAdded(event: ArtistGenreWasAdded) {
    this._genreIds.push(GenreId.fromString(event.genreId));
  }

  private onArtistGenreWasRemoved(event: ArtistGenreWasRemoved) {
    this._genreIds = this._genreIds.filter(
      (genre) => !genre.equals(GenreId.fromString(event.genreId))
    );
  }
}
