import { AggregateRoot } from '@aulasoftwarelibre/nestjs-eventstore';

import {
  EstablishmentEmailWasUpdated,
  EstablishmentGenreWasAdded,
  EstablishmentInfoWasUpdated,
  EstablishmentSlugWasUpdated,
  EstablishmentWasCreated,
  EstablishmentWasDeleted,
} from '../event';
import { EstablishmentAddressWasUpdated } from '../event/establishment-address-was-updated.event';
import { EstablishmentGenreWasRemoved } from '../event/establishment-genre-was-removed.event';
import { EstablishmentAddress } from './address';
import { Description } from './description';
import { Email } from './email';
import { EstablishmentId } from './establishment-id';
import { GenreId } from './genre-id';
import { Name } from './name';
import { OwnerId } from './owner-id';
import { Slug } from './slug';

export class Establishment extends AggregateRoot {
  private _establishmentId: EstablishmentId;
  private _ownerId: OwnerId;
  private _name: Name;
  private _slug: Slug;
  private _description: Description;
  private _email: Email;
  private _address: EstablishmentAddress;
  private _genreIds: GenreId[];
  private _deleted?: Date;

  public static add(
    establishmentId: EstablishmentId,
    ownerId: OwnerId,
    name: Name,
    slug: Slug,
    description: Description,
    email: Email,
    address: EstablishmentAddress
  ): Establishment {
    const establishment = new Establishment();

    establishment.apply(
      new EstablishmentWasCreated(
        establishmentId.value,
        ownerId.value,
        name.value,
        slug.value,
        description.value,
        email.value,
        address.value
      )
    );

    return establishment;
  }

  aggregateId(): string {
    return this._establishmentId.value;
  }

  get id(): EstablishmentId {
    return this._establishmentId;
  }

  get genres(): GenreId[] {
    return this._genreIds;
  }

  get deleted(): boolean {
    return !!this._deleted;
  }

  hasGenre(genreId: GenreId): boolean {
    return this._genreIds.some((item: GenreId) => item.equals(genreId));
  }

  addGenre(genre: GenreId): void {
    if (this.hasGenre(genre)) {
      return;
    }

    this.apply(
      new EstablishmentGenreWasAdded(this._establishmentId.value, genre.value)
    );
  }

  removeGenre(genre: GenreId): void {
    if (!this.hasGenre(genre)) {
      return;
    }

    this.apply(
      new EstablishmentGenreWasRemoved(this._establishmentId.value, genre.value)
    );
  }

  updateInfo(name: Name, description: Description): void {
    if (
      this._name.value === name.value &&
      this._description.value === description.value
    ) {
      return;
    }

    this.apply(
      new EstablishmentInfoWasUpdated(
        this._establishmentId.value,
        name.value,
        description.value
      )
    );
  }

  updateEmail(email: Email): void {
    if (email.value === this._email.value) {
      return;
    }

    this.apply(
      new EstablishmentEmailWasUpdated(this._establishmentId.value, email.value)
    );
  }

  updateSlug(slug: Slug): void {
    if (slug.value === this._slug.value) {
      return;
    }

    this.apply(
      new EstablishmentSlugWasUpdated(this._establishmentId.value, slug.value)
    );
  }

  updateAddress(address: EstablishmentAddress): void {
    if (
      address.full === this._address.full &&
      address.city === this._address.city
    ) {
      return;
    }

    this.apply(
      new EstablishmentAddressWasUpdated(
        this._establishmentId.value,
        address.full,
        address.city
      )
    );
  }

  delete(): void {
    if (this.deleted) {
      return;
    }

    this.apply(new EstablishmentWasDeleted(this.id.value));
  }

  private onEstablishmentWasCreated(event: EstablishmentWasCreated) {
    const { full, city } = event.address;

    this._establishmentId = EstablishmentId.fromString(event.id);
    this._ownerId = OwnerId.fromString(event.ownerId);
    this._name = Name.fromString(event.name);
    this._slug = Slug.fromString(event.slug);
    this._description = Description.fromString(event.name);
    this._email = Email.fromString(event.email);
    this._address = EstablishmentAddress.with(full, city);
    this._genreIds = [];
    this._deleted = null;
  }

  private onEstablishmentGenreWasAdded(event: EstablishmentGenreWasAdded) {
    this._genreIds.push(GenreId.fromString(event.genreId));
  }

  private onEstablishmentGenreWasRemoved(event: EstablishmentGenreWasRemoved) {
    this._genreIds = this._genreIds.filter(
      (genre) => !genre.equals(GenreId.fromString(event.genreId))
    );
  }

  private onEstablishmentInfoWasUpdated(event: EstablishmentInfoWasUpdated) {
    this._name = Name.fromString(event.name);
    this._description = Description.fromString(event.description);
  }

  private onEstablishmentEmailWasUpdated(event: EstablishmentEmailWasUpdated) {
    this._email = Email.fromString(event.email);
  }

  private onEstablishmentSlugWasUpdated(event: EstablishmentSlugWasUpdated) {
    this._slug = Slug.fromString(event.slug);
  }

  private onEstablishmentAddressWasUpdated(
    event: EstablishmentAddressWasUpdated
  ) {
    this._address = EstablishmentAddress.with(event.full, event.city);
  }

  private onEstablishmentWasDeleted(event: EstablishmentWasDeleted) {
    this._deleted = new Date(event.metadata._ocurred_on);
  }
}
