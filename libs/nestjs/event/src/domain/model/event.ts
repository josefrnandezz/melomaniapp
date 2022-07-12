import { AggregateRoot } from '@aulasoftwarelibre/nestjs-eventstore';
import { EventId } from './event-id';
import { EventName } from './event-name';
import { Address, Description } from '@melomaniapp/nestjs/common';
import { ArtistId } from './artist-id';
import { EstablishmentId } from './establishment-id';
import { GenreId } from './genre-id';

export class Event extends AggregateRoot {
  private readonly _id: EventId;
  private readonly _name: EventName;
  private readonly _description: Description;
  private readonly _startsAt: Date;
  private readonly _endsAt: Date;
  private readonly _artists: ArtistId[];
  private readonly _establishment: EstablishmentId;
  private readonly _genres: GenreId;
  private readonly _address: Address;
  private readonly _isCancelled: boolean;

  aggregateId(): string {
    return this._id.value;
  }
}
