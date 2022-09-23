import { AggregateRoot } from '@aulasoftwarelibre/nestjs-eventstore';
import { Alias, Description } from '@melomaniapp/nestjs/common';

import {
  ArtistAliasWasUpdated,
  ArtistGenreWasAdded,
  ArtistGenreWasRemoved,
  ArtistPersonalInfoWasUpdated,
  ArtistSocialLinkWasAdded,
  ArtistSocialLinkWasRemoved,
  ArtistWasCreated,
  ArtistWasDeleted,
} from '../event';
import { ArtistId } from './artist-id';
import { GenreId } from './genre-id';
import { ArtistName } from './name';
import { SocialLink } from './social-link';
import { UserId } from './user-id';

export class Artist extends AggregateRoot {
  private _id: ArtistId;
  private _userId: UserId;
  private _name: ArtistName;
  private _alias: Alias;
  private _description: Description;
  private _socialLinks: SocialLink[] = [];
  private _genreIds: GenreId[] = [];
  private _deleted?: Date;

  aggregateId(): string {
    return this._id.value;
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

  static add(args: {
    id: ArtistId;
    userId: UserId;
    name: ArtistName;
    alias: Alias;
    description: Description;
    socialLinks: SocialLink[];
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

    this.apply(new ArtistGenreWasRemoved(this.aggregateId(), genre.value));
  }

  hasSocialLink(socialLink: SocialLink): boolean {
    return this._socialLinks.some((item: SocialLink) =>
      item.equals(socialLink)
    );
  }

  addSocialLink(socialLink: SocialLink): void {
    if (this.hasSocialLink(socialLink)) {
      return;
    }

    this.apply(new ArtistSocialLinkWasAdded(this._id.value, socialLink.value));
  }

  removeSocialLink(socialLink: SocialLink): void {
    if (!this.hasSocialLink(socialLink)) {
      return;
    }

    this.apply(
      new ArtistSocialLinkWasRemoved(this.aggregateId(), socialLink.value)
    );
  }

  public updateAlias(alias: Alias): void {
    if (this.alias.equals(alias)) {
      return;
    }

    this.apply(new ArtistAliasWasUpdated(this.aggregateId(), alias.value));
  }

  public updatePersonalInfo(args: {
    name: ArtistName;
    description: Description;
  }): void {
    this.apply(
      new ArtistPersonalInfoWasUpdated(
        this.aggregateId(),
        args.name.value,
        args.description.value
      )
    );
  }

  public delete(): void {
    if (this.deleted) {
      return;
    }

    this.apply(new ArtistWasDeleted(this.aggregateId()));
  }

  private onArtistWasCreated(event: ArtistWasCreated): void {
    this._id = ArtistId.fromString(event.id);
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

  private onArtistSocialLinkWasAdded(event: ArtistSocialLinkWasAdded) {
    this._socialLinks.push(SocialLink.fromString(event.socialLink));
  }

  private onArtistSocialLinkWasRemoved(event: ArtistSocialLinkWasRemoved) {
    this._socialLinks = this._socialLinks.filter(
      (socialLink) =>
        !socialLink.equals(SocialLink.fromString(event.socialLink))
    );
  }

  private onArtistAliasWasUpdated(event: ArtistAliasWasUpdated) {
    this._alias = Alias.fromString(event.alias);
  }

  private onArtistPersonalInfoWasUpdated(event: ArtistPersonalInfoWasUpdated) {
    this._name = ArtistName.fromString(event.name);
    this._description = Description.fromString(event.description);
  }

  private onArtistWasDeleted(event: ArtistWasDeleted) {
    this._deleted = new Date(event.metadata._ocurred_on);
  }
}
