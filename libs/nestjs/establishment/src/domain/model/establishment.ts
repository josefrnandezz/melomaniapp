import { AggregateRoot } from '@aulasoftwarelibre/nestjs-eventstore';

import { EstablishmentGenreWasAdded, EstablishmentWasCreated } from '../event';
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
}
