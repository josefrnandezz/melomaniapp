import { AggregateRoot } from '@aulasoftwarelibre/nestjs-eventstore';

import { EstablishmentWasCreated } from '../event';
import { EstablishmentAddress } from './address';
import { Description } from './description';
import { Email } from './email';
import { EstablishmentId } from './establishment-id';
import { Name } from './name';
import { Slug } from './slug';

export class Establishment extends AggregateRoot {
  private _establishmentId: EstablishmentId;
  private _name: Name;
  private _slug: Slug;
  private _description: Description;
  private _email: Email;
  private _address: EstablishmentAddress;
  private _genreIds: string[];
  private _deleted?: Date;

  public static add(
    establishmentId: EstablishmentId,
    name: Name,
    slug: Slug,
    description: Description,
    email: Email,
    address: EstablishmentAddress,
    genreIds: string[]
  ): Establishment {
    const establishment = new Establishment();

    establishment.apply(
      new EstablishmentWasCreated(
        establishmentId.value,
        name.value,
        slug.value,
        description.value,
        email.value,
        address.value,
        genreIds
      )
    );

    return establishment;
  }

  aggregateId(): string {
    return this._establishmentId.value;
  }

  private onEstablishmentWasCreated(event: EstablishmentWasCreated) {
    const { street, number, postalCode, city, country } = event.address;

    this._establishmentId = EstablishmentId.fromString(event.id);
    this._name = Name.fromString(event.name);
    this._slug = Slug.fromString(event.slug);
    this._description = Description.fromString(event.name);
    this._email = Email.fromString(event.email);
    this._address = EstablishmentAddress.with(
      street,
      number,
      postalCode,
      city,
      country
    );
    this._deleted = null;
  }
}
